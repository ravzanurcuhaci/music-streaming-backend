//Express uygulamasını ayağa kaldırır
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const songRoutes = require('./routes/song.routes');
const playlistRoutes = require('./routes/playlist.routes');
const artistRoutes = require('./routes/artist.route');
const playlistSongRoutes = require('./routes/playlist_song.route');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'music backend is running',
    });
});
app.use('/auth', authRoutes);
app.use('/songs', songRoutes);
app.use('/playlists', playlistRoutes);
app.use('/artists', artistRoutes);
app.use('/playlist-songs', playlistSongRoutes);
app.use(errorHandler);
module.exports = app;