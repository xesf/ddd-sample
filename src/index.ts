// import { v4 as uuid } from 'uuid';

// // Scenario: Online Reservation
// // The user selects the day and the time when he/she would like to see the movie.
// // The system lists movies available in the given time interval - title and screening times.
// // The user chooses a particular screening.
// // The system gives information regarding screening room and available seats.
// // The user chooses seats, and gives the name of the person doing the reservation (name and surname).
// // The system gives back the total amount to pay and reservation expiration time.

// // Value Objects

// export type GUID = string;

// // Screen Time - DateTime
// // Create boundaries to screen time
// // Validation on the Date (bank holidays)
// export class ScreenTime {
//     constructor(date: any, duration) {
//         this.uuid = uuid();
//         this.date = date;
//         this.duration = duration;
//     }
// }

// // Movie - Object / Metadata
// export class Movie {
//     constructor(title, duration, summary, ageRating) {
//         this.uuid = uuid();
//         this.title = title;
//         this.duration = duration;
//         this.summary = summary;
//         this.ageRating = ageRating;
//     }
// }

// // Screening - Object
// export class Screening {
//     constructor(movie, screenTime) {
//         this.movie = movie;
//         this.screenTime = screenTime;
//     }
// }

// // Seat - Object
// export interface Seat {
//     uuid: GUID;
//     row: number;
//     seat: number;
//     isVIP?: boolean;
//     isAccessible?: boolean;
// }

// // Customer - Object (name/surname)
// export class Customer {
//     constructor(name, surname, age, additionalNeeds) {
//         this.uuid = uuid();
//         this.name = name;
//         this.surname = surname;
//         this.age = age;
//         this.additionalNeeds = additionalNeeds;
//     }
// }

// // Movies - Entity
// // Add Movie (Movie)
// export class Movies {
//     constructor(date) {
//         this.movies = [];
//     }

//     add(movie) {
//         this.movies.push(movie);
//     }

//     add(movie) {
//         this.movies.push(movie);
//     }
// }

// // Seats - Entity
// // Seats Availability - Entity/Aggregate

// // Shopping Cart - Entity (total amount)

// // Additional behaviour
// // The system covers mutliple cinemas all over Europe with multiple rooms (multiplex).
// // Seats can be booked at latest 15 minutes before the screening begins.
// // There are three ticket types: adult, student, child with varying prices.
// // 3D Movies and D-Box Seats cost extra. For students the price gets procentually redacted.

// // Covid-19 bonus round
// // There must be at least be a single place left over in a row between two already reserved places.

// console.log('DONE');
