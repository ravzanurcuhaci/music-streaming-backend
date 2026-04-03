const pool = require('../../../src/config/db');
const { generateToken } = require('../../../src/utils/jwt');
const authService = require('../../../src/services/auth.service');

jest.mock('../../../src/config/db', () => ({
    query: jest.fn(),
}));

jest.mock('../../../src/utils/jwt', () => ({
    generateToken: jest.fn(),
}));

describe('auth.service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserDetail', () => {
        it('kullanıcı detayını döndürmeli', async () => {
            const mockUser = { user_id: 1, username: 'ravza', email: 'ravza@test.com' };

            pool.query.mockResolvedValue({ rows: [mockUser] });

            const result = await authService.getUserDetail(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_user_detail($1)',
                [1]
            );
            expect(result).toEqual(mockUser);
        });
    });

    describe('registerUser', () => {
        it('yeni kullanıcı oluşturmalı', async () => {
            const input = {
                username: 'ravza',
                email: 'ravza@test.com',
                password: '123456'
            };

            const mockResponse = {
                user_id: 1,
                username: 'ravza',
                email: 'ravza@test.com'
            };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await authService.registerUser(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_create_user($1, $2, $3)',
                [input.username, input.email, input.password]
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('loginUser', () => {
        it('geçerli kullanıcıda user ve token döndürmeli', async () => {
            const input = {
                email: 'ravza@test.com',
                password: '123456'
            };

            const mockUser = {
                user_id: 1,
                email: 'ravza@test.com',
                username: 'ravza'
            };

            pool.query.mockResolvedValue({ rows: [mockUser] });
            generateToken.mockReturnValue('mock-token-123');

            const result = await authService.loginUser(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_login($1, $2)',
                [input.email, input.password]
            );

            expect(generateToken).toHaveBeenCalledWith({
                id: mockUser.user_id,
                email: mockUser.email
            });

            expect(result).toEqual({
                user: mockUser,
                token: 'mock-token-123'
            });
        });

        it('kullanıcı yoksa hata fırlatmalı', async () => {
            pool.query.mockResolvedValue({ rows: [] });

            await expect(
                authService.loginUser({
                    email: 'yanlis@test.com',
                    password: 'wrongpass'
                })
            ).rejects.toThrow('Invalid email or password');

            expect(generateToken).not.toHaveBeenCalled();
        });
    });

    describe('changeUserPassword', () => {
        it('şifre değiştirme sonucunu döndürmeli', async () => {
            const input = {
                userId: 1,
                oldPassword: 'old123',
                newPassword: 'new123'
            };

            const mockResponse = { success: true, message: 'Password updated' };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await authService.changeUserPassword(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_change_password($1, $2, $3)',
                [input.userId, input.oldPassword, input.newPassword]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('updateUser', () => {
        it('kullanıcıyı güncellemeli', async () => {
            const input = {
                userId: 1,
                email: 'newmail@test.com',
                is_active: true
            };

            const mockResponse = {
                user_id: 1,
                email: 'newmail@test.com',
                is_active: true
            };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await authService.updateUser(input);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_update_user($1, $2, $3)',
                [input.userId, input.email, input.is_active]
            );

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getUserPlaylists', () => {
        it('playlist listesini döndürmeli', async () => {
            const mockPlaylists = [
                { playlist_id: 1, name: 'Favoriler' },
                { playlist_id: 2, name: 'Chill' }
            ];

            pool.query.mockResolvedValue({ rows: mockPlaylists });

            const result = await authService.getUserPlaylists(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_user_playlists($1)',
                [1]
            );

            expect(result).toEqual(mockPlaylists);
        });
    });

    describe('getUserListiningHistory', () => {
        it('dinleme geçmişini döndürmeli', async () => {
            const mockHistory = [
                { song_id: 1, title: 'Song A' },
                { song_id: 2, title: 'Song B' }
            ];

            pool.query.mockResolvedValue({ rows: mockHistory });

            const result = await authService.getUserListiningHistory(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_get_user_listening_history($1)',
                [1]
            );

            expect(result).toEqual(mockHistory);
        });
    });

    describe('deleteUser', () => {
        it('kullanıcı silme sonucunu döndürmeli', async () => {
            const mockResponse = { success: true };

            pool.query.mockResolvedValue({ rows: [mockResponse] });

            const result = await authService.deleteUser(1);

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM public.fn_delete_user($1)',
                [1]
            );

            expect(result).toEqual(mockResponse);
        });
    });
});