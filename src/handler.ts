// import { v4 as uuid } from 'uuid';

// // A Customer reserves specific seats at a specific screening
// // (for simplicity, assume there exists only one screening for the time beeing).
// // If availble, the seats should be reserved.

// import { Customer, GUID, Seat } from '.';

// // CustomerReservationCommand
// // input
// // * CustomerId
// // * ScreeningId
// // * Seat[]

// // Command
// export class ReserveSeats {
//     customerId: GUID;
//     screeningId: GUID;
//     seats: Seat[];

//     constructor(customerId: GUID, screeningId: GUID, seats: Seat[]) {
//         this.customerId = customerId;
//         this.screeningId = screeningId;
//         this.seats = seats;
//     }
// }

// // Handler
// export const reserve = (reserve: ReserveSeats) => {
//     Reservation.reserve(reserve.customerId, reserve.screeningId, reserve.seats);
// };

// export interface Event {
//     uuid: string;
// }

// // Event
// export class SeatsReserved implements Event {
//     uuid: GUID;
//     seat: Seat;

//     constructor(seat: Seat) {
//         this.uuid = uuid();
//         this.seat = seat;
//     }
// }

// const events: Event[] = [];

// const publishEvent = (event: Event) => {
//     events.push(event);
// };

// // Aggregate
// class Reservation {
//     // state
//     // receive events

//     static reserve(customerId: GUID, screeningId: GUID, seats: Seat[]) {
//         const screeening = getScreening(screeningId);
//         const isAvailable = screeening.isAvailable(seats);
//         if (isAvailable) {
//             publishEvent(new SeatsReserved());
//         }
//     }
// }

// const getScreening = (screeningId: GUID) => ({
//     uuid: screeningId,
//     isAvailable: (seats: Seat[]) => {
//         return true;
//     },
// });
