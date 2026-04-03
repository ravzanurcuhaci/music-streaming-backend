const pool = require('../../../src/config/db');
const playlistService = require('../../../src/services/playlist.service');

//gerçek db değil onun yerine sahte query
jest.mock('../../../src/config/db', () => ({
    query: jest.fn(),
}));

describe('playlist.service', () => {
    //her test sonrası mockları temizle çünkü testler birbirine karışmasın
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getPlaylistDetail', () => {
        it('çalma listesi detayını döndürmeli', async () => {
            const mockPlaylist = {
                playlist_id: 1,
                title: 'My Favorites',
                description: 'My favorite songs',
                is_public: true,
            };

            pool.query.mockResolvedValue({ rows: [mockPlaylist] });

            const result = await playlistService.getPlaylistDetail(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_playlist_detail($1)',
                [1]
            );
            expect(result).toEqual(mockPlaylist);
        });
    });
    describe('createPlaylist', () => {
        it('yeni çalma listesi oluşturmalı', async () => {
            const input = {
                userId: 10,
                title: 'My Favorites',
                description: 'My favorite songs',
                isPublic: true,
            }
            const mockResponse = {
                playlist_id: 1,
                ...input,
            }
            pool.query.mockResolvedValue({ rows: [mockResponse] });
            const result = await playlistService.createPlaylist(input);
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_create_playlist($1, $2, $3, $4)',
                [
                    input.userId,
                    input.title,
                    input.description,
                    input.isPublic,
                ]
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('updatePlaylist', () => {
        it('çalma listesi güncellenmeli', async () => {
            const input = {
                playlistId: 1,
                userId: 10,
                title: 'My Favorites Updated',
                description: 'Updated description',
                isPublic: false,
            }

            const mockResponse = {
                ...input,
            }
            pool.query.mockResolvedValue({ rows: [mockResponse] });
            const result = await playlistService.updatePlaylist(input);
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_update_playlist($1, $2, $3, $4, $5)',
                [
                    input.playlistId,
                    input.userId,
                    input.title,
                    input.description,
                    input.isPublic,
                ]
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('deletePLaylist', () => {
        it('çalma listesi silinmeli', async () => {
            const mockResponse = {
                success: true,
            };
            pool.query.mockResolvedValue({ rows: [mockResponse] });
            const result = await playlistService.deletePlaylist(1);
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_delete_playlist($1)',
                [1]
            );
            expect(result).toEqual(mockResponse);
        });
    });


    describe('getPlaylistSongs', () => {
        it('çalma listesindeki şarkıları döndürmeli', async () => {
            //bu ksıımda yalancı db yi giriyorum.
            const mockSongs = [
                {
                    song_id: 1,
                    title: 'Believer',
                    artist_name: 'Imagine Dragons',
                    album_title: 'Evolve',
                    duration_seconds: 204,
                },
                {
                    song_id: 2,
                    title: 'Thunder',
                    artist_name: 'Imagine Dragons',
                    album_title: 'Evolve',
                    duration_seconds: 187,
                },
            ];
            //mockResolvedValue ile test sonuucnun döneceği veriyi belirliyorum.
            pool.query.mockResolvedValue({ rows: mockSongs });
            //burada gerçek fonksiyonu çağırıyorum ve onun sonucunu result değişkenine atıyorum. Bu fonksiyonun içinde pool.query çağrısı olacak ve o da benim mockladığım sonucu döndürecek.
            const result = await playlistService.getPlaylistSongs(1);
            //son olarak da pool.query'nin doğru sorgu ile çağrıldığını ve fonksiyonun beklediğim sonucu döndürdüğünü test ediyorum.
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_playlist_songs($1)',
                [1]
            );
            //sonuç olarak da mockSongs ile aynı sonucu döndürmeli.
            expect(result).toEqual(mockSongs);
        });
    });
}); 