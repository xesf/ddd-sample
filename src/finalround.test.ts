import { v4 as uuid } from 'uuid';

jest.mock('uuid', () => {
    return {
        v4: jest.fn().mockImplementation(() => 'unitTestId'),
    };
});

// INFRASTRUCTURE --------

type GUID = string;

// Command
class Command {
    constructor() {}
}

// CommandHandler (repository, commands)
class CommandHandler {
    // repository: Repository;
    constructor(command: any) {}
    register() {}
    handle() {}
}

// Event
class Event {
    aggregateId: string;
    constructor(aggregateId: string) {
        this.aggregateId = aggregateId;
    }
}

// Aggregate
class Aggregate {
    history: Event[];
    constructor() {
        this.history = [];
    }

    getEvents() {
        return this.history;
    }
}

class Policy {
    constructor() {}
}

// EventStore
// aggregateId
// event
class EventStore {
    constructor() {}

    publish() {}

    subscribe() {}
}

// Query
class Query {
    // repository
    constructor() {}
}

// Repository (getById, persist)
class Repository {
    // template/generics
    constructor() {}

    getById(id: string) {}

    persist(object: any) {}
}

// MessageBus (commands, queries)

// DOMAIN ---------------

interface Seat {
    uuid: GUID;
    row: number;
    seat: number;
}

class ReserveSeatCommand extends Command {
    seats: Seat[];
    constructor(seats: Seat[]) {
        super();
        this.seats = seats;
    }
}

class ReserveSeatsIfAvailable extends Aggregate {
    seats: Seat[];
    constructor(seats: Seat[]) {
        super();
        this.seats = seats;
    }
}

class SeatsReserved extends Event {
    constructor(aggregateId: string) {
        super(aggregateId);
    }
}

class SeatsNotAvailable extends Event {
    constructor(aggregateId: string) {
        super(aggregateId);
    }
}

interface Screening {
    seats: Seat[];
}

class ScreeningStore {
    seats: Seat[];
    constructor() {
        this.seats = [];
    }
    getSeats() {
        return this.seats;
    }

    setSeats(screening: Screening) {
        this.seats = screening.seats;
    }
}

// ScreeningStore
class ScreeningQuery extends Query {
    constructor() {
        super();
    }

    getScreeningAvailableSeats() {}
}

const when = (queryOrComand: any, params: any) => {
    return queryOrComand(...Object.values(params));
};

describe('Reservation', () => {
    const screeingStore = new ScreeningStore();

    beforeEach(() => {
        // given
    });

    it('Get Screening Rooms and Available Seats', () => {
        // given
        // we have a Screening with available seats
        const screening: Screening = {
            seats: [
                {
                    uuid: '1',
                    row: 1,
                    seat: 1,
                },
                {
                    uuid: '1',
                    row: 1,
                    seat: 2,
                },
            ],
        };
        screeingStore.setSeats(screening);

        // when
        // when(ScreeningQuery

        // then
    });
});
