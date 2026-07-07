import type { NewReservationFormData, ReservationCategory } from "@/types/trip";

interface FieldsProps {
    form: NewReservationFormData;
    update: (updates: Partial<NewReservationFormData>) => void;
}

const inputClass =
    "w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

const labelClass = "mb-1 block text-xs text-neutral-500";

// ─── Hotel ────────────────────────────────────────────────────────────────────
function HotelFields({ form, update }: FieldsProps) {
    const h = form.hotel;
    const set = (u: Partial<typeof h>) =>
        update({ hotel: { ...h, ...u } });

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <label className={labelClass}>Check-in *</label>
                    <input type="date" value={h.checkIn} onChange={(e) => set({ checkIn: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Check-out *</label>
                    <input type="date" value={h.checkOut} min={h.checkIn || undefined} onChange={(e) => set({ checkOut: e.target.value })} className={inputClass} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className={labelClass}>Hóspedes</label>
                    <input type="number" min="1" value={h.guestCount} onChange={(e) => set({ guestCount: e.target.value })} placeholder="6" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Quartos</label>
                    <input type="number" min="1" value={h.roomCount} onChange={(e) => set({ roomCount: e.target.value })} placeholder="3" className={inputClass} />
                </div>
            </div>
            <div>
                <label className={labelClass}>Endereço</label>
                <input type="text" value={h.address} onChange={(e) => set({ address: e.target.value })} placeholder="Av. Beira Mar Norte, 1.200 · Centro" className={inputClass} />
            </div>
            <div>
                <label className={labelClass}>Código da reserva</label>
                <input type="text" value={h.reservationCode} onChange={(e) => set({ reservationCode: e.target.value })} placeholder="Ex: #BM2026-0110" className={inputClass} />
            </div>
        </div>
    );
}

// ─── Voo ──────────────────────────────────────────────────────────────────────
function FlightFields({ form, update }: FieldsProps) {
    const f = form.flight;
    const set = (u: Partial<typeof f>) =>
        update({ flight: { ...f, ...u } });

    return (
        <div className="space-y-3">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Ida</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                    <label className={labelClass}>Data de ida *</label>
                    <input type="date" value={f.departureDate} onChange={(e) => set({ departureDate: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Partida</label>
                    <input type="time" value={f.departureTime} onChange={(e) => set({ departureTime: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Chegada</label>
                    <input type="time" value={f.arrivalTime} onChange={(e) => set({ arrivalTime: e.target.value })} className={inputClass} />
                </div>
            </div>
            <div>
                <label className={labelClass}>Número do voo</label>
                <input type="text" value={f.flightNumber} onChange={(e) => set({ flightNumber: e.target.value })} placeholder="Ex: Azul 4205" className={inputClass} />
            </div>

            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide pt-1">Volta</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                    <label className={labelClass}>Data de volta</label>
                    <input type="date" value={f.returnDate} min={f.departureDate || undefined} onChange={(e) => set({ returnDate: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Partida</label>
                    <input type="time" value={f.returnTime} onChange={(e) => set({ returnTime: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Chegada</label>
                    <input type="time" value={f.arrivalTime} onChange={(e) => set({ arrivalTime: e.target.value })} className={inputClass} />
                </div>
            </div>
            <div>
                <label className={labelClass}>Número do voo de volta</label>
                <input type="text" value={f.returnFlightNumber} onChange={(e) => set({ returnFlightNumber: e.target.value })} placeholder="Ex: Azul 4521" className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className={labelClass}>Passageiros</label>
                    <input type="number" min="1" value={f.passengerCount} onChange={(e) => set({ passengerCount: e.target.value })} placeholder="6" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Classe</label>
                    <select value={f.cabinClass} onChange={(e) => set({ cabinClass: e.target.value })} className={inputClass}>
                        <option value="economy">Economy</option>
                        <option value="premium">Premium Economy</option>
                        <option value="business">Business</option>
                    </select>
                </div>
            </div>
            <div>
                <label className={labelClass}>Localizador</label>
                <input type="text" value={f.locator} onChange={(e) => set({ locator: e.target.value })} placeholder="Ex: AZUL-XK9F2M" className={inputClass} />
            </div>
        </div>
    );
}

// ─── Carro ────────────────────────────────────────────────────────────────────
function CarFields({ form, update }: FieldsProps) {
    const c = form.car;
    const set = (u: Partial<typeof c>) =>
        update({ car: { ...c, ...u } });

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <label className={labelClass}>Data de retirada *</label>
                    <input type="date" value={c.pickupDate} onChange={(e) => set({ pickupDate: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Horário de retirada</label>
                    <input type="time" value={c.pickupTime} onChange={(e) => set({ pickupTime: e.target.value })} className={inputClass} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <label className={labelClass}>Data de devolução</label>
                    <input type="date" value={c.returnDate} min={c.pickupDate || undefined} onChange={(e) => set({ returnDate: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Horário de devolução</label>
                    <input type="time" value={c.returnTime} onChange={(e) => set({ returnTime: e.target.value })} className={inputClass} />
                </div>
            </div>
            <div>
                <label className={labelClass}>Local de retirada</label>
                <input type="text" value={c.pickupLocation} onChange={(e) => set({ pickupLocation: e.target.value })} placeholder="Ex: Aeroporto Hercílio Luz" className={inputClass} />
            </div>
            <div>
                <label className={labelClass}>Modelo do veículo</label>
                <input type="text" value={c.carModel} onChange={(e) => set({ carModel: e.target.value })} placeholder="Ex: Jeep Compass ou similar" className={inputClass} />
            </div>
            <div>
                <label className={labelClass}>Código da reserva</label>
                <input type="text" value={c.reservationCode} onChange={(e) => set({ reservationCode: e.target.value })} placeholder="Ex: LOC-489201" className={inputClass} />
            </div>
        </div>
    );
}

// ─── Passeio ──────────────────────────────────────────────────────────────────
function TourFields({ form, update }: FieldsProps) {
    const t = form.tour;
    const set = (u: Partial<typeof t>) =>
        update({ tour: { ...t, ...u } });

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                    <label className={labelClass}>Data *</label>
                    <input type="date" value={t.date} onChange={(e) => set({ date: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Início</label>
                    <input type="time" value={t.startTime} onChange={(e) => set({ startTime: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Término</label>
                    <input type="time" value={t.endTime} onChange={(e) => set({ endTime: e.target.value })} className={inputClass} />
                </div>
            </div>
            <div>
                <label className={labelClass}>Pessoas</label>
                <input type="number" min="1" value={t.peopleCount} onChange={(e) => set({ peopleCount: e.target.value })} placeholder="6" className={inputClass} />
            </div>
            <div>
                <label className={labelClass}>Ponto de encontro</label>
                <input type="text" value={t.meetingPoint} onChange={(e) => set({ meetingPoint: e.target.value })} placeholder="Ex: Trapiche Municipal · Centro" className={inputClass} />
            </div>
            <div>
                <label className={labelClass}>Aviso / pendência</label>
                <input type="text" value={t.warning} onChange={(e) => set({ warning: e.target.value })} placeholder="Ex: Pagamento pendente até 12 jan" className={inputClass} />
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