const pool = require('../../../src/config/db');
const artistService = require('../../../src/services/artist.services');

jest.mock('../../../src/config/db', () => ({
    query: jest.fn(),
}));

describe('artist.service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getArtistDetail', () => {
        it('sanatçı detayını döndürmeli', async () => {
            const mockArtist = {
                artist_id: 1,
                name: 'Imagine Dragons',
                bio: 'Rock band',
                country: 'USA',
            };

            pool.query.mockResolvedValue({ rows: [mockArtist] });

            const result = await artistService.getArtistDetail(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_artist_detail($1)',
                [1]
            );

            expect(result).toEqual(mockArtist);
        });
    });

    describe('createArtist', () => {
        it('yeni sanatçı oluşturmalı', async () => {
            const input = {
                name: 'Imagine Dragons',
                bio: 'Rock band',
                country: 'USA',
            };

            const mockResponse = {
                artist_id: 1,
                name: 'Imagine Dragons',
                bio: 'Rock band',
                country: 'USA',
            };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await artistService.createArtist(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_create_artist($1, $2, $3)',
                [input.name, input.bio, input.country]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('updateArtist', () => {
        it('sanatçıyı güncellemeli', async () => {
            const input = {
                artistId: 1,
                bio: 'Updated bio',
                country: 'UK',
            };

            const mockResponse = {
                artist_id: 1,
                bio: 'Updated bio',
                country: 'UK',
            };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await artistService.updateArtist(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_update_artist($1, $2, $3)',
                [input.artistId, input.bio, input.country]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('deleteArtist', () => {
        it('sanatçıyı silmeli', async () => {
            const mockResponse = { success: true };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await artistService.deleteArtist(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_delete_artist($1)',
                [1]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getTopArtists', () => {
        //arrange
        it('en popüler sanatçıları döndürmeli', async () => {
            const mockArtists = [
                { artist_id: 1, name: 'Artist A' },
                { artist_id: 2, name: 'Artist B' },
            ];

            pool.query.mockResolvedValue({ rows: mockArtists });
            //act
            const result = await artistService.getTopArtists();
            //assert
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM fn_get_top_artists()'
            );

            expect(result).toEqual(mockArtists);
        });
    });

    describe('getArtistAlbums', () => {
        it('sanatçının albümlerini döndürmeli', async () => {
            const mockAlbums = [
                { album_id: 1, title: 'Album 1' },
                { album_id: 2, title: 'Album 2' },
            ];

            pool.query.mockResolvedValue({ rows: mockAlbums });

            const result = await artistService.getArtistAlbums(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_artist_albums($1)',
                [1]
            );

            expect(result).toEqual(mockAlbums);
        });
    });
});