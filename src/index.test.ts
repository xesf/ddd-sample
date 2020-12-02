import { v4 as uuid } from 'uuid';

// A Customer reserves specific seats at a specific screening
// (for simplicity, assume there exists only one screening for the time beeing).
// If availble, the seats should be reserved.

import { reserve, ReserveSeats } from './handler';

describe('Reserve', () => {
    const reserveObj: ReserveSeats = new ReserveSeats('1', '2', [{ uuid: '3', row: 1, seat: 10 }]);
    it('Create New Reserve Seats', () => {
        const reserve = jest.fn();
        expect(reserve(reserveObj)).toBeCalled();
    });
});
