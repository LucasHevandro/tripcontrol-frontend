import type { NewReservationFormData, ReservationCategory } from "@/types/trip";

interface FieldsProps {
    form: NewReservationFormData;
    update: (updates: Partial<NewReservationFormData>) => void;
}

const inputClass =
    "w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500";

const labelClass = "mb-1 block text-xs text-neutral-500 dark:text-neutral-400";

const subHeaderClass =
    "text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400";

// ─── Hotel ────────────────────────────────────────────────────────────────────
function HotelFields({ form, update }: FieldsProps) {
    const h = form.hotel;
    const set = (u: Partial<typeof h>) => update({ hotel: { ...h, ...u } });

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h4 className={subHeaderClass}>Datas</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                        <label htmlFor="hotel-checkin" className={labelClass}>Check-in *</label>
                        <input id="hotel-checkin" type="date" value={h.checkIn} onChange={(e) => set({ checkIn: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="hotel-checkout" className={labelClass}>Check-out *</label>
                        <input id="hotel-checkout" type="date" value={h.checkOut} min={h.checkIn || undefined} onChange={(e) => set({ checkOut: e.target.value })} className={inputClass} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className={subHeaderClass}>Hóspedes</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="hotel-guest-count" className={labelClass}>Pessoas</label>
                        <input id="hotel-guest-count" type="number" min="1" value={h.guestCount} onChange={(e) => set({ guestCount: e.target.value })} placeholder="6" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="hotel-room-count" className={labelClass}>Quartos</label>
                        <input id="hotel-room-count" type="number" min="1" value={h.roomCount} onChange={(e) => set({ roomCount: e.target.value })} placeholder="3" className={inputClass} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className={subHeaderClass}>Local e reserva</h4>
                <div className="space-y-3">
                    <div>
                        <label htmlFor="hotel-address" className={labelClass}>Endereço</label>
                        <input id="hotel-address" type="text" value={h.address} onChange={(e) => set({ address: e.target.value })} placeholder="Av. Beira Mar Norte, 1.200 · Centro" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="hotel-reservation-code" className={labelClass}>Código da reserva</label>
                        <input id="hotel-reservation-code" type="text" value={h.reservationCode} onChange={(e) => set({ reservationCode: e.target.value })} placeholder="Ex: #BM2026-0110" className={inputClass} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Voo ──────────────────────────────────────────────────────────────────────
function FlightFields({ form, update }: FieldsProps) {
    const f = form.flight;
    const set = (u: Partial<typeof f>) => update({ flight: { ...f, ...u } });

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h4 className={subHeaderClass}>Ida</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                        <label htmlFor="flight-departure-date" className={labelClass}>Data *</label>
                        <input id="flight-departure-date" type="date" value={f.departureDate} onChange={(e) => set({ departureDate: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="flight-departure-time" className={labelClass}>Partida</label>
                        <input id="flight-departure-time" type="time" value={f.departureTime} onChange={(e) => set({ departureTime: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="flight-arrival-time-outbound" className={labelClass}>Chegada</label>
                        <input id="flight-arrival-time-outbound" type="time" value={f.arrivalTime} onChange={(e) => set({ arrivalTime: e.target.value })} className={inputClass} />
                    </div>
                </div>
                <div>
                    <label htmlFor="flight-number" className={labelClass}>Número do voo</label>
                    <input id="flight-number" type="text" value={f.flightNumber} onChange={(e) => set({ flightNumber: e.target.value })} placeholder="Ex: Azul 4205" className={inputClass} />
                </div>
            </div>

            <div className="space-y-2">
                <h4 className={subHeaderClass}>Volta</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                        <label htmlFor="flight-return-date" className={labelClass}>Data</label>
                        <input id="flight-return-date" type="date" value={f.returnDate} min={f.departureDate || undefined} onChange={(e) => set({ returnDate: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="flight-return-time" className={labelClass}>Partida</label>
                        <input id="flight-return-time" type="time" value={f.returnTime} onChange={(e) => set({ returnTime: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="flight-arrival-time-return" className={labelClass}>Chegada</label>
                        <input id="flight-arrival-time-return" type="time" value={f.arrivalTime} onChange={(e) => set({ arrivalTime: e.target.value })} className={inputClass} />
                    </div>
                </div>
                <div>
                    <label htmlFor="flight-return-number" className={labelClass}>Número do voo de volta</label>
                    <input id="flight-return-number" type="text" value={f.returnFlightNumber} onChange={(e) => set({ returnFlightNumber: e.target.value })} placeholder="Ex: Azul 4521" className={inputClass} />
                </div>
            </div>

            <div className="space-y-2">
                <h4 className={subHeaderClass}>Passageiros e reserva</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="flight-passenger-count" className={labelClass}>Quantidade</label>
                        <input id="flight-passenger-count" type="number" min="1" value={f.passengerCount} onChange={(e) => set({ passengerCount: e.target.value })} placeholder="6" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="flight-cabin-class" className={labelClass}>Classe</label>
                        <select id="flight-cabin-class" value={f.cabinClass} onChange={(e) => set({ cabinClass: e.target.value })} className={inputClass}>
                            <option value="economy">Economy</option>
                            <option value="premium">Premium Economy</option>
                            <option value="business">Business</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="flight-locator" className={labelClass}>Localizador</label>
                    <input id="flight-locator" type="text" value={f.locator} onChange={(e) => set({ locator: e.target.value })} placeholder="Ex: AZUL-XK9F2M" className={inputClass} />
                </div>
            </div>
        </div>
    );
}

// ─── Carro ────────────────────────────────────────────────────────────────────
function CarFields({ form, update }: FieldsProps) {
    const c = form.car;
    const set = (u: Partial<typeof c>) => update({ car: { ...c, ...u } });

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h4 className={subHeaderClass}>Retirada</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                        <label htmlFor="car-pickup-date" className={labelClass}>Data *</label>
                        <input id="car-pickup-date" type="date" value={c.pickupDate} onChange={(e) => set({ pickupDate: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="car-pickup-time" className={labelClass}>Horário</label>
                        <input id="car-pickup-time" type="time" value={c.pickupTime} onChange={(e) => set({ pickupTime: e.target.value })} className={inputClass} />
                    </div>
                </div>
                <div>
                    <label htmlFor="car-pickup-location" className={labelClass}>Local</label>
                    <input id="car-pickup-location" type="text" value={c.pickupLocation} onChange={(e) => set({ pickupLocation: e.target.value })} placeholder="Ex: Aeroporto Hercílio Luz" className={inputClass} />
                </div>
            </div>

            <div className="space-y-2">
                <h4 className={subHeaderClass}>Devolução</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                        <label htmlFor="car-return-date" className={labelClass}>Data</label>
                        <input id="car-return-date" type="date" value={c.returnDate} min={c.pickupDate || undefined} onChange={(e) => set({ returnDate: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="car-return-time" className={labelClass}>Horário</label>
                        <input id="car-return-time" type="time" value={c.returnTime} onChange={(e) => set({ returnTime: e.target.value })} className={inputClass} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className={subHeaderClass}>Veículo e reserva</h4>
                <div>
                    <label htmlFor="car-model" className={labelClass}>Modelo</label>
                    <input id="car-model" type="text" value={c.carModel} onChange={(e) => set({ carModel: e.target.value })} placeholder="Ex: Jeep Compass ou similar" className={inputClass} />
                </div>
                <div>
                    <label htmlFor="car-reservation-code" className={labelClass}>Código da reserva</label>
                    <input id="car-reservation-code" type="text" value={c.reservationCode} onChange={(e) => set({ reservationCode: e.target.value })} placeholder="Ex: LOC-489201" className={inputClass} />
                </div>
            </div>
        </div>
    );
}

// ─── Passeio ──────────────────────────────────────────────────────────────────
function TourFields({ form, update }: FieldsProps) {
    const t = form.tour;
    const set = (u: Partial<typeof t>) => update({ tour: { ...t, ...u } });

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h4 className={subHeaderClass}>Data e horário</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                        <label htmlFor="tour-date" className={labelClass}>Data *</label>
                        <input id="tour-date" type="date" value={t.date} onChange={(e) => set({ date: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="tour-start-time" className={labelClass}>Início</label>
                        <input id="tour-start-time" type="time" value={t.startTime} onChange={(e) => set({ startTime: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="tour-end-time" className={labelClass}>Término</label>
                        <input id="tour-end-time" type="time" value={t.endTime} onChange={(e) => set({ endTime: e.target.value })} className={inputClass} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className={subHeaderClass}>Detalhes</h4>
                <div>
                    <label htmlFor="tour-people-count" className={labelClass}>Pessoas</label>
                    <input id="tour-people-count" type="number" min="1" value={t.peopleCount} onChange={(e) => set({ peopleCount: e.target.value })} placeholder="6" className={inputClass} />
                </div>
                <div>
                    <label htmlFor="tour-meeting-point" className={labelClass}>Ponto de encontro</label>
                    <input id="tour-meeting-point" type="text" value={t.meetingPoint} onChange={(e) => set({ meetingPoint: e.target.value })} placeholder="Ex: Trapiche Municipal · Centro" className={inputClass} />
                </div>
                <div>
                    <label htmlFor="tour-warning" className={labelClass}>Aviso / pendência</label>
                    <input id="tour-warning" type="text" value={t.warning} onChange={(e) => set({ warning: e.target.value })} placeholder="Ex: Pagamento pendente até 12 jan" className={inputClass} />
                </div>
            </div>
        </div>
    );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function ReservationCategoryFields({ category, form, update }: FieldsProps & { category: ReservationCategory }) {
    if (category === "hotel") return <HotelFields form={form} update={update} />;
    if (category === "flight") return <FlightFields form={form} update={update} />;
    if (category === "car") return <CarFields form={form} update={update} />;
    if (category === "tour") return <TourFields form={form} update={update} />;
    return null;
}