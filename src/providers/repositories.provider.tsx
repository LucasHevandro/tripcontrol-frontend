"use client";

import { createContext, useContext, type ReactNode } from 'react';
import { HttpAuthRepository } from '@/infrastructure/repositories/auth.repository';
import { HttpUserRepository } from '@/infrastructure/repositories/user.repository';
import { HttpTripRepository } from '@/infrastructure/repositories/trip.repository';
import { HttpExpenseRepository } from '@/infrastructure/repositories/expense.repository';
import { HttpParticipantRepository } from '@/infrastructure/repositories/participant.repository';
import { HttpRoadmapRepository } from '@/infrastructure/repositories/roadmap.repository';
import { HttpReservationRepository } from '@/infrastructure/repositories/reservation.repository';
import type { IAuthRepository } from '@/core/domain/auth/auth.repository.interface';
import type { IUserRepository } from '@/core/domain/user/user.repository.interface';
import type { ITripRepository } from '@/core/domain/trip/trip.repository.interface';
import type { IExpenseRepository } from '@/core/domain/expense/expense.repository.interface';
import type { IParticipantRepository } from '@/core/domain/participant/participant.repository.interface';
import type { IRoadmapRepository } from '@/core/domain/roadmap/roadmap.repository.interface';
import type { IReservationRepository } from '@/core/domain/reservation/reservation.repository.interface';

interface Repositories {
    auth: IAuthRepository;
    user: IUserRepository;
    trip: ITripRepository;
    expense: IExpenseRepository;
    participant: IParticipantRepository;
    roadmap: IRoadmapRepository;
    reservation: IReservationRepository;
}

// Singleton — instâncias criadas uma vez e reutilizadas
const repositories: Repositories = {
    auth: new HttpAuthRepository(),
    user: new HttpUserRepository(),
    trip: new HttpTripRepository(),
    expense: new HttpExpenseRepository(),
    participant: new HttpParticipantRepository(),
    roadmap: new HttpRoadmapRepository(),
    reservation: new HttpReservationRepository(),
};

const RepositoriesContext = createContext<Repositories>(repositories);

export function RepositoriesProvider({ children }: { children: ReactNode }) {
    return (
        <RepositoriesContext.Provider value={repositories}>
            {children}
        </RepositoriesContext.Provider>
    );
}

export function useRepositories() {
    return useContext(RepositoriesContext);
}