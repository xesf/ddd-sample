import { v4 as uuid } from 'uuid';

// Scenarion:
// The customer wants to see the available seats of the screening,
// chooses from the list wich ones to reserve and gets informed about
// success or failure of the reservation.
// The reservation is only possible up to 15 minutes before the screening.

jest.mock('uuid', () => {
    return {
        v4: jest.fn().mockImplementation(() => 'unitTestId'),
    };
});

// const uuid = (): GUID => 'unitTestId';

type GUID = string;

interface Seat {
    uuid: GUID;
    row: number;
    seat: number;
    isVIP?: boolean;
    isAccessible?: boolean;
}

interface Event {
    uuid: string;
}

class SeatsReserved implements Event {
    uuid: GUID;
    customerId: GUID;
    seat: Seat;

    constructor(customerId: GUID, seat: Seat) {
        this.uuid = uuid();
        this.customerId = customerId;
        this.seat = seat;
    }
}

class SeatsReservationFailed implements Event {
    uuid: GUID;
    customerId: GUID;
    reason: string;
    constructor(customerId: GUID, reason: string) {
        this.uuid = uuid();
        this.customerId = customerId;
        this.reason = reason;
    }
}

class SeatsReservationCanceled implements Event {
    uuid: GUID;
    customerId: GUID;
    seat: Seat;

    constructor(customerId: GUID, seat: Seat) {
        this.uuid = uuid();
        this.customerId = customerId;
        this.seat = seat;
    }
}

const REASON = 'Too close to screening time';

const events: any = [];

// Domain model : Agregation
const reserve = (reservationTime: number, customerId: GUID, seat: Seat) => {
    // assume only one screening 12
    const screeniningTime = 30;
    if (screeniningTime - reservationTime > 12) {
        events.push(new SeatsReserved(customerId, seat));
        return;
    }
    events.push(new SeatsReservationFailed(customerId, REASON));
};

const cancel = (customerId: GUID, seat: Seat) => {
    // project this to a SeatsReservation model
    // if event of type cancel, add a flag to the model about the cancellation.
    events.push(new SeatsReservationCanceled(customerId, seat));
};

const getReservedSeatsByCustomer = (customerId: GUID) => {
    return events.filter((e: SeatsReserved) => e.customerId === customerId);
};

const when = (command: any, params: any) => {
    return command(...Object.values(params));
};

describe('Reservation', () => {
    beforeEach(() => {
        // given
        events.push(
            ...[
                new SeatsReserved('customer-1', { uuid: '1', row: 1, seat: 1 }),
                new SeatsReserved('customer-2', { uuid: '2', row: 10, seat: 5 }),
                new SeatsReserved('customer-3', { uuid: '3', row: 14, seat: 10 }),
            ],
        );
    });

    // Write two tests to ensure each business rule
    // from the scenario by only using the commands and  events in your test.
    it('Reserve a Seat', () => {
        const customerId = 'customer-2';

        // when
        when(reserve, { reservationTime: 0, customerId, seat: { uuid: '4', row: 10, seat: 6 } });

        // then
        expect(events[3]).toEqual(new SeatsReserved(customerId, { uuid: '4', row: 10, seat: 6 }));
    });

    // Build a readmodel that supports the user with the required information.
    // Write a test to ensure, given the past events,
    // when a query is issued the expected responce is delivered.
    it('Query a Reserved Seat', () => {
        const customerId = 'customer-2';

        // when
        const seatsReserved = when(getReservedSeatsByCustomer, { customerId });

        // then
        expect(seatsReserved[0]).toEqual(new SeatsReserved(customerId, { uuid: '2', row: 10, seat: 5 }));
        expect(seatsReserved[1]).toEqual(new SeatsReserved(customerId, { uuid: '4', row: 10, seat: 6 }));
    });

    // Write an "integration" test that uses only commands and queries,
    // no events to check the whole business behaviour of the system.
    it('Reserve and Query a reserved seat', () => {
        const customerId = 'customer-4';

        // when
        when(reserve, { reservationTime: 0, customerId, seat: { uuid: '5', row: 15, seat: 15 } });
        const seatsReserved = when(getReservedSeatsByCustomer, { customerId });

        // then
        expect(seatsReserved[0]).toEqual(new SeatsReserved(customerId, { uuid: '5', row: 15, seat: 15 }));
    });

    it('Should cancel the reservation close to screening time', () => {
        const customerId = 'customer-5';

        // given

        // when
        when(reserve, { reservationTime: 20, customerId, seat: { uuid: '6', row: 20, seat: 15 } });
        const seatsReserved = when(getReservedSeatsByCustomer, { customerId });

        // then
        expect(seatsReserved[0]).toEqual(new SeatsReservationFailed(customerId, REASON));
    });
});
