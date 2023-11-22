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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const User_1 = __importDefault(require("./User"));
const body_parser_1 = __importDefault(require("body-parser"));
const connectBD_1 = __importDefault(require("./connectBD"));
const app = (0, express_1.default)();
const PORT = 5003;
const apiKey = "64d2030684a562afa048c30263e478c8";
//middlware pour parser le corps des requetes en json
app.use(body_parser_1.default.json());
//Connect to MongoDB Atlas
(0, connectBD_1.default)();
// Signup endpoint
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, favorites } = req.body;
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create a new user
        const newUser = new User_1.default({
            username,
            email,
            password,
            favorites,
        });
        // Save the user to the database
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// get the list of movies from TMDb api
app.get('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
        const movies = response.data.results;
        res.status(200).json(movies);
    }
    catch (error) {
        //alert(JSON.stringify(error));
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
//get the list of tv shows from TMDp api
app.get('/tv', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`);
        const series = response.data.results;
        res.status(200).json(series);
    }
    catch (error) {
        console.error('Error fetching series:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// geting the top 5 most rated movies
app.get('/movies/top', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reponsedata = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en&page=1`);
        // prendre les 5 premier films avec slice
        const topmovies = reponsedata.data.results.slice(0, 5);
        resp.status(200).json(topmovies);
    }
    catch (error) {
        console.error('error fetvhing top 5 movies ', error);
        resp.status(500).json({ messahe: 'server error' });
    }
}));
// geting the top 5 most rated tv shows
app.get('/tv/top', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reponsedata = yield axios_1.default.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en&page=1`);
        // prendre les 5 premieres series avec slice
        const toptv = reponsedata.data.results.slice(0, 5);
        resp.status(200).json(toptv);
    }
    catch (error) {
        console.error('error fetvhing top 5 series ', error);
        resp.status(500).json({ messahe: 'server error' });
    }
}));
//getting the list of 10 movies on a specific page number 
app.get('/moviesPagination', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNumber = parseInt(req.query.page) || 1;
        const size = 10;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en`);
        const totalResults = response.data.total_results;
        const totalPages = response.data.total_pages;
        // Fetch movies for the specified page and size
        const startIdx = (pageNumber - 1) * size;
        const endIdx = startIdx + size;
        const allMovies = response.data.results.slice(startIdx, endIdx);
        res.status(200).json({
            totalResults,
            totalPages,
            currentPage: pageNumber,
            movies: allMovies,
        });
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
