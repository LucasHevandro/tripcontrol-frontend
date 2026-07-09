export const TRIP_GRADIENTS = [
    "from-emerald-500 via-emerald-600 to-teal-700",
    "from-sky-500 via-sky-600 to-blue-700",
    "from-amber-500 via-orange-500 to-orange-600",
    "from-indigo-500 via-violet-500 to-purple-600",
    "from-rose-500 via-pink-500 to-fuchsia-600",
    "from-slate-600 via-slate-700 to-slate-900",
];

export function getTripGradient(seed: string): string {
    let sum = 0;
    for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
    return TRIP_GRADIENTS[sum % TRIP_GRADIENTS.length];
}