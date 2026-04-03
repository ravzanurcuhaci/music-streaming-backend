const pool = require('../../../src/config/db');
const albumService = require('../../../src/services/album.services');

jest.mock('../../../src/config/db', () => ({
    query: jest.fn(),
}));

describe('album.service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAlbumDetail', () => {
        it('albüm detayını döndürmeli', async () => {
            const mockAlbum = {
                album_id: 1,
                title: 'Evolve',
                artist_id: 10,
                release_year: 2017,
            };

            pool.query.mockResolvedValue({ rows: [mockAlbum] });

            const result = await albumService.getAlbumDetail(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_album_detail($1)',
                [1]
            );

            expect(result).toEqual(mockAlbum);
        });
    });

    describe('createAlbum', () => {
        it('yeni albüm oluşturmalı', async () => {
            const input = {
                title: 'Evolve',
                artistId: 10,
                releaseYear: 2017,
            };

            const mockResponse = {
                album_id: 1,
                title: 'Evolve',
                artist_id: 10,
                release_year: 2017,
            };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await albumService.createAlbum(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_create_album($1, $2, $3)',
                [input.artistId, input.title, input.releaseYear]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('updateAlbum', () => {
        it('albümü güncellemeli', async () => {
            const input = {
                albumId: 1,
                title: 'Evolve Updated',
                artistId: 10,
                releaseYear: 2018,
            };

            const mockResponse = {
                album_id: 1,
                title: 'Evolve Updated',
                artist_id: 10,
                release_year: 2018,
            };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await albumService.updateAlbum(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_update_album($1, $2, $3, $4)',
                [
                    input.albumId,
                    input.artistId,
                    input.title,
                    input.releaseYear,
                ]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    //return olmadığı için en sondaki expect().toEqual doğrulamasını yapmıyoruz 
    describe('deleteAlbum', () => {
        it('albümü silmeli', async () => {
            pool.query.mockResolvedValue({});

            await albumService.deleteAlbum(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_delete_album($1)',
                [1]
            );
        });
    });

    describe('getAlbumSongs', () => {
        it('albümdeki şarkıları döndürmeli', async () => {
            const mockSongs = [
                { song_id: 1, title: 'Believer' },
                { song_id: 2, title: 'Thunder' },
            ];

            pool.query.mockResolvedValue({ rows: mockSongs });

            const result = await albumService.getAlbumSongs(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_album_songs($1)',
                [1]
            );

            expect(result).toEqual(mockSongs);
        });
    });
});