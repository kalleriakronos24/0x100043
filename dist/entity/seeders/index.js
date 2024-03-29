"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function randomTags() {
    const tags = ['non-fiction', 'fiction', 'essay', 'science'];
    const randomSelectedArray = Math.floor(Math.random() * tags.length);
    let randomNumber = [];
    for (let idx = 0; idx < randomSelectedArray; idx++) {
        randomNumber.push(idx);
    }
    const randomTags = [];
    for (const tag of tags) {
        const randNumber = Math.floor(Math.random() * randomNumber.length);
        if (tags[randNumber] === tag) {
            randomTags.push(tag);
        }
    }
    if (randomTags.length > 0) {
        return randomTags;
    }
    else {
        return [tags[Math.floor(Math.random() * tags.length)]];
    }
}
function randomCoverImage() {
    const urls = [
        'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
        'https://m.media-amazon.com/images/I/91uFyvEVSeL._SY522_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/814ovO1B8xL._AC_UL320_SR320,320_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/91sy6YF7i4L._AC_UL320_SR320,320_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/91EZWrPaE2L._AC_UL320_SR320,320_.jpg',
        'https://m.media-amazon.com/images/I/61IbbP-U73L._SY522_.jpg',
        'https://m.media-amazon.com/images/I/51smXa05psL._BG0,0,0,0_FMpng_AC_SY480_SX480_.jpg',
        'https://m.media-amazon.com/images/I/41yxJ8C2uGL._BG0,0,0,0_FMpng_AC_SY480_SX480_.jpg',
    ];
    return urls[Math.floor(Math.random() * urls.length)];
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [
            {
                username: 'sampleuser1',
                password: bcrypt_1.default.hashSync('sampleuser1password', 10),
            },
        ];
        for (const user of users) {
            yield prisma.user.upsert({
                where: {
                    username: user.username,
                },
                create: Object.assign({}, user),
                update: Object.assign({}, user),
            });
            console.log(`finished seeding user: ${user.username} pass: ${user.password}`);
        }
        const books = [
            {
                title: 'Deanne Massey',
                writer: 'Berry Barlow',
                tags: randomTags(),
                price: 71.1,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Carolyn Duncan',
                writer: 'Lourdes Hanson',
                tags: randomTags(),
                price: 15.66,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Earlene Chaney',
                writer: 'Clara Bowen',
                tags: randomTags(),
                price: 61.06,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Lacy Downs',
                writer: 'Elsa Coleman',
                tags: randomTags(),
                price: 66.32,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Underwood Howell',
                writer: 'Stevens Velazquez',
                tags: randomTags(),
                price: 26.43,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Beck Cobb',
                writer: 'Bennett Mendoza',
                tags: randomTags(),
                price: 19.06,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Bridget Byers',
                writer: 'Maria Butler',
                tags: randomTags(),
                price: 12.12,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Gilda Frazier',
                writer: 'Steele Brady',
                tags: randomTags(),
                price: 9.36,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Lowe Martinez',
                writer: 'Laura Matthews',
                tags: randomTags(),
                price: 58.75,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Ferrell Crawford',
                writer: 'Adrian Sanchez',
                tags: randomTags(),
                price: 37.43,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Autumn Macias',
                writer: 'Mack Griffith',
                tags: randomTags(),
                price: 31.33,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Mcclure Stone',
                writer: 'Horn Mitchell',
                tags: randomTags(),
                price: 20.71,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Cabrera Hensley',
                writer: 'Janet Chang',
                tags: randomTags(),
                price: 62.26,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Gay Dudley',
                writer: 'Jackson Moody',
                tags: randomTags(),
                price: 96.6,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Flossie Mclean',
                writer: 'Clark Jefferson',
                tags: randomTags(),
                price: 84.93,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Silvia Knapp',
                writer: 'Rutledge Caldwell',
                tags: randomTags(),
                price: 8.4,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Serrano Juarez',
                writer: 'Elnora Donaldson',
                tags: randomTags(),
                price: 20.47,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Gross Santiago',
                writer: 'Travis Oneil',
                tags: randomTags(),
                price: 93.15,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Vicky Bernard',
                writer: 'Merle Stanley',
                tags: randomTags(),
                price: 53.05,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Lancaster Hansen',
                writer: 'Mills Underwood',
                tags: randomTags(),
                price: 54.49,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Lola Delgado',
                writer: 'Lelia Ramirez',
                tags: randomTags(),
                price: 72.68,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Vazquez Osborn',
                writer: 'Erickson Cain',
                tags: randomTags(),
                price: 95.75,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Oconnor Montgomery',
                writer: 'Hopper Kramer',
                tags: randomTags(),
                price: 80.38,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Katharine Harrison',
                writer: 'Huber Larsen',
                tags: randomTags(),
                price: 22.15,
                coverImage: randomCoverImage(),
            },
            {
                title: 'May Preston',
                writer: 'Paige King',
                tags: randomTags(),
                price: 69.74,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Durham Cochran',
                writer: 'Horne Hudson',
                tags: randomTags(),
                price: 54.01,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Krista Carson',
                writer: 'Cleveland Valenzuela',
                tags: randomTags(),
                price: 16.58,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Rasmussen Valdez',
                writer: 'Hobbs Barnes',
                tags: randomTags(),
                price: 22.05,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Barr Wade',
                writer: 'Carroll Burnett',
                tags: randomTags(),
                price: 70.88,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Lyons Haynes',
                writer: 'Decker Cabrera',
                tags: randomTags(),
                price: 6.7,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Petra Keller',
                writer: 'Lynnette Parker',
                tags: randomTags(),
                price: 76.9,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Ruiz Blackburn',
                writer: 'Dudley Baxter',
                tags: randomTags(),
                price: 18.51,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Eunice Slater',
                writer: 'Guerra Romero',
                tags: randomTags(),
                price: 99.73,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Joni Church',
                writer: 'Wagner Mann',
                tags: randomTags(),
                price: 7.15,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Suzette Lynn',
                writer: 'Preston Cantrell',
                tags: randomTags(),
                price: 34.88,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Blair Mullins',
                writer: 'Jewell Rosario',
                tags: randomTags(),
                price: 51.74,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Opal Michael',
                writer: 'Rodgers Arnold',
                tags: randomTags(),
                price: 73.08,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Sharron Malone',
                writer: 'Bobbie Hancock',
                tags: randomTags(),
                price: 23.62,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Candace Morton',
                writer: 'Melendez Cooper',
                tags: randomTags(),
                price: 6.18,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Robbie Lowe',
                writer: 'Tonia Marks',
                tags: randomTags(),
                price: 49.45,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Moore Horn',
                writer: 'Hodges Bishop',
                tags: randomTags(),
                price: 68.64,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Jannie Clayton',
                writer: 'Hutchinson Patrick',
                tags: randomTags(),
                price: 72,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Jeannette Lane',
                writer: 'Sheena Olson',
                tags: randomTags(),
                price: 91.21,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Webb Cox',
                writer: 'Bernadine Rose',
                tags: randomTags(),
                price: 81.85,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Ginger Forbes',
                writer: 'Maxine Leach',
                tags: randomTags(),
                price: 33.86,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Whitfield Small',
                writer: 'Alison Gilbert',
                tags: randomTags(),
                price: 5.32,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Brigitte Crosby',
                writer: 'Francisca Cardenas',
                tags: randomTags(),
                price: 86.9,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Hammond Johnston',
                writer: 'Ora Dunn',
                tags: randomTags(),
                price: 39.62,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Tammi Riley',
                writer: 'Blackwell Gamble',
                tags: randomTags(),
                price: 40.46,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Duke Berg',
                writer: 'Callahan Mcknight',
                tags: randomTags(),
                price: 34.86,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Martinez Baker',
                writer: 'Angelita Obrien',
                tags: randomTags(),
                price: 76.93,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Key Koch',
                writer: 'Alyson Anderson',
                tags: randomTags(),
                price: 65.09,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Shaffer Mcdowell',
                writer: 'Hope Gordon',
                tags: randomTags(),
                price: 50.1,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Dale Haley',
                writer: 'Colon Andrews',
                tags: randomTags(),
                price: 61.15,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Verna Townsend',
                writer: 'Eileen Curry',
                tags: randomTags(),
                price: 85.53,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Georgina Pittman',
                writer: 'Craig Hunt',
                tags: randomTags(),
                price: 23.2,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Strong Mathews',
                writer: 'Cherry Miller',
                tags: randomTags(),
                price: 45.14,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Gomez Cotton',
                writer: 'Myers House',
                tags: randomTags(),
                price: 4.62,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Tamra Schultz',
                writer: 'Jimmie Goff',
                tags: randomTags(),
                price: 69.27,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Jeanette Pierce',
                writer: 'Rodriquez Good',
                tags: randomTags(),
                price: 19.84,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Jeanne Little',
                writer: 'Melba Hahn',
                tags: randomTags(),
                price: 44.7,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Mullins Love',
                writer: 'Lavonne Walter',
                tags: randomTags(),
                price: 47.22,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Sharlene Shannon',
                writer: 'Holloway Bradford',
                tags: randomTags(),
                price: 7.25,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Mollie Mcpherson',
                writer: 'Riley Navarro',
                tags: randomTags(),
                price: 13.32,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Nicole Aguirre',
                writer: 'Pearl Stein',
                tags: randomTags(),
                price: 9.05,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Hines Sloan',
                writer: 'Wiley Singleton',
                tags: randomTags(),
                price: 59.71,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Dean Medina',
                writer: 'Kitty Gill',
                tags: randomTags(),
                price: 3.23,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Mclaughlin Lloyd',
                writer: 'Margo Tucker',
                tags: randomTags(),
                price: 41.66,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Burch Norris',
                writer: 'Reynolds Ball',
                tags: randomTags(),
                price: 30.63,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Ingrid Humphrey',
                writer: 'Hensley Vaughan',
                tags: randomTags(),
                price: 21.26,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Twila Griffin',
                writer: 'Daisy Nixon',
                tags: randomTags(),
                price: 48.11,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Rose Goodman',
                writer: 'Hattie Herrera',
                tags: randomTags(),
                price: 55.63,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Woodward Gay',
                writer: 'Jolene Atkinson',
                tags: randomTags(),
                price: 47.72,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Vance Guerra',
                writer: 'Brooke Rasmussen',
                tags: randomTags(),
                price: 36.99,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Ellison Ryan',
                writer: 'Blanche Vazquez',
                tags: randomTags(),
                price: 89.08,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Hodge Fields',
                writer: 'Andrea Wynn',
                tags: randomTags(),
                price: 83.11,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Emerson Roberts',
                writer: 'Duffy Rivers',
                tags: randomTags(),
                price: 42.93,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Merrill Davis',
                writer: 'Reeves Lancaster',
                tags: randomTags(),
                price: 18.33,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Jenifer Berry',
                writer: 'Carter Watkins',
                tags: randomTags(),
                price: 49.34,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Cohen Whitaker',
                writer: 'Desiree Stark',
                tags: randomTags(),
                price: 49.35,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Carolina Alford',
                writer: 'Craft Reilly',
                tags: randomTags(),
                price: 8.49,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Ila Fox',
                writer: 'Wells Sampson',
                tags: randomTags(),
                price: 53.7,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Elizabeth Guthrie',
                writer: 'Acosta Nolan',
                tags: randomTags(),
                price: 64.8,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Angelina Walsh',
                writer: 'Sexton Carroll',
                tags: randomTags(),
                price: 16.78,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Henry Craig',
                writer: 'Skinner Bennett',
                tags: randomTags(),
                price: 21.54,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Lucy Thomas',
                writer: 'Randi Dennis',
                tags: randomTags(),
                price: 42.44,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Audrey Gilmore',
                writer: 'Sara Mosley',
                tags: randomTags(),
                price: 30.39,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Bettie Gross',
                writer: 'Arline Hickman',
                tags: randomTags(),
                price: 77.62,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Kathrine Ferrell',
                writer: 'Pauline Schneider',
                tags: randomTags(),
                price: 61.29,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Mendoza Brennan',
                writer: 'Hardy Norman',
                tags: randomTags(),
                price: 13.9,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Campos Martin',
                writer: 'Simmons Barker',
                tags: randomTags(),
                price: 96.95,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Barry Lang',
                writer: 'Janis Reid',
                tags: randomTags(),
                price: 79.67,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Clare Fuller',
                writer: 'Sheree Anthony',
                tags: randomTags(),
                price: 15.3,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Jeanie Nunez',
                writer: 'Virginia Hatfield',
                tags: randomTags(),
                price: 11.35,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Anthony Rodriguez',
                writer: 'Carpenter Padilla',
                tags: randomTags(),
                price: 89.11,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Bessie Snyder',
                writer: 'Doreen Curtis',
                tags: randomTags(),
                price: 26.86,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Rhea Russo',
                writer: 'Alford Day',
                tags: randomTags(),
                price: 58.9,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Brittany Owens',
                writer: 'Annabelle Colon',
                tags: randomTags(),
                price: 28.75,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Drake Mcdonald',
                writer: 'Mckenzie Dean',
                tags: randomTags(),
                price: 35.23,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Terrie Ferguson',
                writer: 'Bertha Crane',
                tags: randomTags(),
                price: 53.06,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Glenda Sykes',
                writer: 'Nadia Bentley',
                tags: randomTags(),
                price: 58.39,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Caitlin Allen',
                writer: 'Allison Greer',
                tags: randomTags(),
                price: 60.4,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Vickie Poole',
                writer: 'Dina Daniels',
                tags: randomTags(),
                price: 10.66,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Carey Henry',
                writer: 'Frost Mccray',
                tags: randomTags(),
                price: 91.94,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Wiggins Rodgers',
                writer: 'Meyers Roman',
                tags: randomTags(),
                price: 1.71,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Baird Branch',
                writer: 'Knapp Lopez',
                tags: randomTags(),
                price: 24.56,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Tommie Mercer',
                writer: 'Elva Faulkner',
                tags: randomTags(),
                price: 47.82,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Kerr Pollard',
                writer: 'Barron Phillips',
                tags: randomTags(),
                price: 13.18,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Sutton Herring',
                writer: 'Hurst Frye',
                tags: randomTags(),
                price: 46.16,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Carmella Maldonado',
                writer: 'Goodwin Carter',
                tags: randomTags(),
                price: 70.62,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Hayes Heath',
                writer: 'Koch Quinn',
                tags: randomTags(),
                price: 81.06,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Ruby Jarvis',
                writer: 'Leslie Young',
                tags: randomTags(),
                price: 92.76,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Emma Ross',
                writer: 'Good Hess',
                tags: randomTags(),
                price: 92.84,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Calderon Mason',
                writer: 'Bowers Weeks',
                tags: randomTags(),
                price: 24.37,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Veronica Sellers',
                writer: 'Margarita Hogan',
                tags: randomTags(),
                price: 17.77,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Park Ewing',
                writer: 'Christie Webster',
                tags: randomTags(),
                price: 47.21,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Tina Phelps',
                writer: 'Solomon Burns',
                tags: randomTags(),
                price: 36.43,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Nixon Mckenzie',
                writer: 'Olga Bell',
                tags: randomTags(),
                price: 50.74,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Sybil Harris',
                writer: 'Cox Bryan',
                tags: randomTags(),
                price: 44.65,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Angie Mendez',
                writer: 'Tamika Mcguire',
                tags: randomTags(),
                price: 17.85,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Marci Hebert',
                writer: 'Lott Perry',
                tags: randomTags(),
                price: 23.1,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Calhoun Garrett',
                writer: 'Doyle Kane',
                tags: randomTags(),
                price: 17.67,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Hillary Boyle',
                writer: 'Erica Golden',
                tags: randomTags(),
                price: 32.13,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Karla Richardson',
                writer: 'Earnestine Dunlap',
                tags: randomTags(),
                price: 71.88,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Bruce Sanders',
                writer: 'Hamilton Barton',
                tags: randomTags(),
                price: 6.79,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Patti Porter',
                writer: 'Frazier Shaffer',
                tags: randomTags(),
                price: 20.78,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Terry Johns',
                writer: 'Benjamin Dorsey',
                tags: randomTags(),
                price: 60.5,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Erika Salinas',
                writer: 'Schmidt Mayer',
                tags: randomTags(),
                price: 93.91,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Hyde Hutchinson',
                writer: 'Karyn Johnson',
                tags: randomTags(),
                price: 37.2,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Terry Burke',
                writer: 'Kennedy Burris',
                tags: randomTags(),
                price: 45.86,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Florine Oneal',
                writer: 'Burgess Ballard',
                tags: randomTags(),
                price: 27.7,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Carlson Rivera',
                writer: 'Dejesus Williams',
                tags: randomTags(),
                price: 65.27,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Sonya Roberson',
                writer: 'Burnett Velasquez',
                tags: randomTags(),
                price: 63.69,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Reese Hester',
                writer: 'Guadalupe Sutton',
                tags: randomTags(),
                price: 9.36,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Miles Ashley',
                writer: 'Bowman Hartman',
                tags: randomTags(),
                price: 38,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Richardson Ellis',
                writer: 'Alyssa Huffman',
                tags: randomTags(),
                price: 40.93,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Amie Morales',
                writer: 'Wright Barr',
                tags: randomTags(),
                price: 41.43,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Dionne Vance',
                writer: 'Cobb Camacho',
                tags: randomTags(),
                price: 36.75,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Hester Maynard',
                writer: 'Jackie Palmer',
                tags: randomTags(),
                price: 45.7,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Mercado Atkins',
                writer: 'Saundra Burks',
                tags: randomTags(),
                price: 12.51,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Bond Chambers',
                writer: 'Nichole Fleming',
                tags: randomTags(),
                price: 12.92,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Jimenez Franklin',
                writer: 'Tami Newton',
                tags: randomTags(),
                price: 73.59,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Lillian Pace',
                writer: 'Newman Sims',
                tags: randomTags(),
                price: 17.17,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Fitzpatrick Hurley',
                writer: 'Lewis Shelton',
                tags: randomTags(),
                price: 39.69,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Andrews Fry',
                writer: 'Pearson Franco',
                tags: randomTags(),
                price: 44.19,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Brandi Warner',
                writer: 'Kristine Mcmahon',
                tags: randomTags(),
                price: 36.11,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Wilkinson Manning',
                writer: 'Cecelia Santana',
                tags: randomTags(),
                price: 55.61,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Schultz Lester',
                writer: 'Blanchard Cooke',
                tags: randomTags(),
                price: 30.44,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Connie Duran',
                writer: 'Marcy Fulton',
                tags: randomTags(),
                price: 29.48,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Golden Nichols',
                writer: 'Laverne Duke',
                tags: randomTags(),
                price: 34.2,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Woods Knight',
                writer: 'Rhonda Washington',
                tags: randomTags(),
                price: 69.62,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Nina Hernandez',
                writer: 'Bobbi Graves',
                tags: randomTags(),
                price: 68.44,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Mcconnell Irwin',
                writer: 'Castro Dale',
                tags: randomTags(),
                price: 46.32,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Erin Mullen',
                writer: 'Tara Callahan',
                tags: randomTags(),
                price: 55.6,
                coverImage: randomCoverImage(),
            },
            {
                title: 'Mcdowell Torres',
                writer: 'Crystal Garcia',
                tags: randomTags(),
                price: 47.47,
                coverImage: randomCoverImage(),
            },
        ];
        for (const book of books) {
            yield prisma.book.upsert({
                where: {
                    title: book.title,
                },
                create: Object.assign({}, book),
                update: Object.assign({}, book),
            });
            console.log(`finished seeding book title: ${book.title}`);
        }
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
