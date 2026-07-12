import assert from "node:assert/strict";
import test from "node:test";
import { buildCreateExpensePayload, calculatePerPersonAmount } from "../src/components/expenses/expense-form.ts";
import { buildActivityPayload, getActivityCostPreview } from "../src/components/roadmap/activity-form.ts";
import { buildReservationPayload, EMPTY_RESERVATION_FORM } from "../src/components/reservations/reservation-form.ts";
import { buildCreateTripPayload, INITIAL_TRIP_FORM, isTripStep1Valid } from "../src/components/trips/new-trip/new-trip-form.ts";
import { LocalStorageTokenAdapter } from "../src/infrastructure/http/local-storage-token.adapter.ts";
import { getInviteLoginHref, getRedirectTarget } from "../src/lib/auth-routing.ts";
import { formatBalance } from "../src/lib/format.ts";
import type { NewActivityFormData, NewExpenseFormData, NewReservationFormData, NewTripFormData } from "../src/types/trip.ts";

function installBrowserStorage() {
    const values = new Map<string, string>();
    const cookieWrites: string[] = [];
    const fakeStorage = {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
        removeItem: (key: string) => values.delete(key),
        clear: () => values.clear(),
        key: (index: number) => Array.from(values.keys())[index] ?? null,
        get length() {
            return values.size;
        },
    } as Storage;
    const fakeDocument = {};

    Object.defineProperty(fakeDocument, "cookie", {
        get: () => cookieWrites.join("; "),
        set: (value: string) => {
            cookieWrites.push(value);
        },
    });
    Object.defineProperty(globalThis, "window", { value: {}, configurable: true });
    Object.defineProperty(globalThis, "localStorage", { value: fakeStorage, configurable: true });
    Object.defineProperty(globalThis, "document", { value: fakeDocument, configurable: true });

    return { cookieWrites, values };
}

test("auth session stores and clears local tokens plus middleware cookies", () => {
    const { cookieWrites, values } = installBrowserStorage();
    const adapter = new LocalStorageTokenAdapter();

    adapter.setTokens("access-token", "refresh-token");

    assert.equal(values.get("tc_access_token"), "access-token");
    assert.equal(values.get("tc_refresh_token"), "refresh-token");
    assert.ok(cookieWrites.some((cookie) => cookie.startsWith("tc_access_token=access-token")));
    assert.ok(cookieWrites.some((cookie) => cookie.startsWith("tc_refresh_token=refresh-token")));

    adapter.clearTokens();

    assert.equal(values.has("tc_access_token"), false);
    assert.equal(values.has("tc_refresh_token"), false);
    assert.ok(cookieWrites.some((cookie) => cookie.startsWith("tc_access_token=;")));
    assert.ok(cookieWrites.some((cookie) => cookie.startsWith("tc_refresh_token=;")));
});

test("auth routing keeps only internal redirect targets", () => {
    assert.equal(getRedirectTarget("?redirect=/join/abc"), "/join/abc");
    assert.equal(getRedirectTarget("?redirect=https://example.com"), "/trips");
    assert.equal(getRedirectTarget("?redirect=//example.com"), "/trips");
    assert.equal(getInviteLoginHref("abc def"), "/login?redirect=%2Fjoin%2Fabc%20def");
});

test("trip creation payload converts UI values to API enums", () => {
    const form: NewTripFormData = {
        ...INITIAL_TRIP_FORM,
        name: "Floripa",
        destination: "Florianopolis",
        destinationType: "beach",
        startDate: "2026-01-10",
        endDate: "2026-01-17",
        tripType: "friends",
        budget: "2500",
        description: "Ferias em grupo",
    };

    assert.equal(isTripStep1Valid(form), true);
    assert.deepEqual(buildCreateTripPayload(form), {
        name: "Floripa",
        destination: "Florianopolis",
        destinationType: "BEACH",
        startDate: "2026-01-10",
        endDate: "2026-01-17",
        tripType: "FRIENDS",
        budget: 2500,
        description: "Ferias em grupo",
        emoji: undefined,
    });
});

test("expense payload and financial split are calculated consistently", () => {
    const form: NewExpenseFormData = {
        description: "Jantar",
        amount: "300",
        date: "2026-01-11",
        category: "Alimentação",
        paidById: "user-1",
        splitType: "custom",
        splitParticipantIds: ["user-1", "user-2", "user-3"],
        receiptFile: null,
        notes: "Mesa compartilhada",
    };

    assert.equal(calculatePerPersonAmount(300, 3), 100);
    assert.match(formatBalance(-90), /^- R\$\s?90$/u);
    assert.deepEqual(buildCreateExpensePayload(form), {
        description: "Jantar",
        amount: 300,
        date: "2026-01-11",
        category: "Alimentação",
        paidById: "user-1",
        splitType: "EQUAL",
        splitParticipants: [
            { participantId: "user-1" },
            { participantId: "user-2" },
            { participantId: "user-3" },
        ],
        notes: "Mesa compartilhada",
    });
});

test("reservation payload keeps category-specific details", () => {
    const form: NewReservationFormData = {
        ...EMPTY_RESERVATION_FORM,
        category: "hotel",
        title: "Hotel Centro",
        subtitle: "Hospedagem",
        amount: "1200",
        paidById: "user-1",
        hotel: {
            ...EMPTY_RESERVATION_FORM.hotel,
            checkIn: "2026-01-10",
            checkOut: "2026-01-17",
            reservationCode: "ABC123",
        },
    };

    assert.deepEqual(buildReservationPayload(form), {
        category: "HOTEL",
        title: "Hotel Centro",
        subtitle: "Hospedagem",
        amount: 1200,
        paidById: "user-1",
        notes: undefined,
        details: {
            checkIn: "2026-01-10",
            checkOut: "2026-01-17",
            guestCount: "",
            roomCount: "",
            address: "",
            reservationCode: "ABC123",
        },
    });
});

test("roadmap activity payload maps cost modes for the API", () => {
    const form: NewActivityFormData = {
        emoji: "🏖️",
        title: "Praia",
        date: "2026-01-12",
        startTime: "09:00",
        duration: "2h",
        location: "Campeche",
        costAmount: "50",
        costType: "per_person",
        note: "Levar toalha",
    };

    assert.equal(getActivityCostPreview(form)?.endsWith("/pessoa"), true);
    assert.deepEqual(buildActivityPayload(form), {
        emoji: "🏖️",
        title: "Praia",
        date: "2026-01-12",
        startTime: "09:00",
        duration: "2h",
        location: "Campeche",
        costAmount: 50,
        costType: "PER_PERSON",
        note: "Levar toalha",
    });
});
