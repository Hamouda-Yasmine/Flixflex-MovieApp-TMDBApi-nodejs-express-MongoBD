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
const connectBD_1 = __importDefault(require("./connectBD"));
const app = (0, express_1.default)();
const PORT = 5002;
const apiKey = "64d2030684a562afa048c30263e478c8";
//middlware pour parser le corps des requetes en json
app.use(express_1.default.json());
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
        const nombretotalmovies = response.data.total_results;
        // supprimer la virgule
        const totalPages = Math.floor(nombretotalmovies / 10);
        // recuperer la position (debut,fin) des films rn fonction de la page et size
        const startIdx = (pageNumber - 1) * size;
        const endIdx = startIdx + size;
        const tenMovies = response.data.results.slice(startIdx, endIdx);
        res.status(200).json({
            nombretotalmovies,
            totalPages,
            currentPage: pageNumber,
            movies: tenMovies,
        });
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
//getting the list of 10 tv on a specific page number 
app.get('/tvPagination', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNumber = parseInt(req.query.page) || 1;
        const size = 10;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`);
        const nombretotaltv = response.data.total_results;
        console.log("nombre total", nombretotaltv);
        // supprimer la virgule
        const totalPages = Math.floor(nombretotaltv / 10);
        // recuperer la position (debut,fin) des films rn fonction de la page et size
        const startIdx = (pageNumber - 1) * size;
        const endIdx = startIdx + size;
        const tenMovies = response.data.results.slice(startIdx, endIdx);
        res.status(200).json({
            nombretotaltv,
            totalPages,
            currentPage: pageNumber,
            movies: tenMovies,
        });
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// add movies or tv in my favorite list
app.post('/add-favorite', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //655cf25c6a9d6abb10d3a103
        const userId = req.body.userId;
        //670292
        const movieId = req.body.movieId;
        // Find the user by ID
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Add the movie ID to favorites if not already in the list
        if (!user.favorites.includes(movieId)) {
            user.favorites.push(movieId);
            yield user.save();
            return res.status(200).json({ message: 'Movie added to favorites successfully' });
        }
        else {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }
    }
    catch (error) {
        console.error('Error adding movie to favorites:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// delete from list of favorites
app.delete('/delete-favorite', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const movieId = req.body.movieId;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.favorites = user.favorites.filter(id => id !== movieId);
        yield user.save();
        return res.status(200).json({ message: 'Movie deleted from favorites successfully' });
    }
    catch (error) {
        console.error('Error deleting movie from favorites:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// to view the list of my favorite movies and series
app.get('/favorites/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const favoriteIDs = user.favorites || [];
        return res.status(200).json(favoriteIDs);
    }
    catch (error) {
        console.error('Error retrieving favorite movies:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// search fo movies
app.get('/search/movie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: apiKey,
                query: query,
            },
        });
        res.json(response.data.results);
    }
    catch (error) {
        console.error('Error searching for movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//consulter le detail d'un film 
app.get('/moviedetail/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idmovie = req.params.id;
    try {
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${idmovie}?api_key=${apiKey}&language=en`);
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error(`Error fetching movie details for ID ${idmovie}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
//consulter le detail d'une serie 
app.get('/tv/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idtv = req.params.id;
    try {
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/tv/${idtv}?api_key=${apiKey}`);
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error(`Error fetching tv details for ID ${idtv}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
