import { v4 as uuid } from 'uuid';

// A Customer reserves specific seats at a specific screening
// (for simplicity, assume there exists only one screening for the time beeing).
// If availble, the seats should be reserved.

import { Customer, GUID, Seat } from '.';

// CustomerReservationCommand
// input
// * CustomerId
// * ScreeningId
// * Seat[]

// Command
export class ReserveSeats {
    customerId: GUID;
    screeningId: GUID;
    seats: Seat[];

    constructor(customerId: GUID, screeningId: GUID, seats: Seat[]) {
        this.customerId = customerId;
        this.screeningId = screeningId;
        this.seats = seats;
    }
}

// Handler
export const reserve = (reserve: ReserveSeats) => {
    const screeening = getScreening(reserve.screeningId);
    const isAvailable = screeening.isAvailable(reserve.seats);
    if (isAvailable) {
        Reservation.reserve(reserve.customerId, reserve.screeningId, reserve.seats);
    }
};

// Aggregate
class Reservation {
    static reserve(customerId: GUID, screeningId: GUID, seats: Seat[]) {
        // do something
    }
}

const getScreening = (screeningId: GUID) => ({
    uuid: screeningId,
    isAvailable: (seats: Seat[]) => {
        return true;
    },
});
