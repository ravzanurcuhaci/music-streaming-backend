const pool = require('../../../src/config/db');
const songService = require('../../../src/services/song.service');
jest.mock('../../../src/config/db', () => ({
    query: jest.fn(),
}));

describe('song.service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getSongDetail', () => {
        it('şarkı detayını döndürmeli', async () => {
            const mockSong = {
                song_id: 1,
                title: 'Believer',
                artist_id: 10,
            };

            pool.query.mockResolvedValue({ rows: [mockSong] });

            const result = await songService.getSongDetail(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_song_detail($1)',
                [1]
            );
            expect(result).toEqual(mockSong);
        });
    });

    describe('createSong', () => {
        it('yeni şarkı oluşturmalı', async () => {
            const input = {
                artistId: 10,
                title: 'Believer',
                albumId: 5,
                durationSeconds: 204,
                trackNumber: 1,
            };

            const mockResponse = {
                song_id: 1,
                //input içindeki key valuları buraya ekler
                ...input,
            };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await songService.createSong(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_create_song($1, $2, $3, $4, $5)',
                [
                    input.artistId,
                    input.title,
                    input.albumId,
                    input.durationSeconds,
                    input.trackNumber,
                ]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('updateSong', () => {
        it('şarkıyı güncellemeli', async () => {
            const input = {
                songId: 1,
                artistId: 10,
                title: 'Believer Updated',
                albumId: 5,
                durationSeconds: 210,
                trackNumber: 2,
            };

            const mockResponse = {
                success: true,
                ...input,
            };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await songService.updateSong(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_update_song($1, $2, $3, $4, $5, $6)',
                [
                    input.songId,
                    input.artistId,
                    input.title,
                    input.albumId,
                    input.durationSeconds,
                    input.trackNumber,
                ]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('deleteSong', () => {
        it('şarkıyı silmeli', async () => {
            const mockResponse = { success: true };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await songService.deleteSong(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_delete_song($1)',
                [1]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getTopSongs', () => {
        it('en popüler şarkıları döndürmeli', async () => {
            const mockSongs = [
                { song_id: 1, title: 'Song A' },
                { song_id: 2, title: 'Song B' },
            ];

            pool.query.mockResolvedValue({ rows: mockSongs });

            const result = await songService.getTopSongs();

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM fn_get_top_songs()'
            );

            expect(result).toEqual(mockSongs);
        });
    });

    describe('getRelatedSongs', () => {
        it('benzer şarkıları döndürmeli', async () => {
            const mockSongs = [
                { song_id: 3, title: 'Related 1' },
                { song_id: 4, title: 'Related 2' },
            ];

            pool.query.mockResolvedValue({ rows: mockSongs });

            const result = await songService.getRelatedSongs(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_related_songs($1)',
                [1]
            );

            expect(result).toEqual(mockSongs);
        });
    });
});