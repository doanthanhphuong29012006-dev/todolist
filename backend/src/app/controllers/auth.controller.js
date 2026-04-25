import * as authService from '../services/auth.service.js';

export async function login(req, res) {
    const validLogin = await authService.checkValidLogin(req.body);
    if (validLogin) {
        const token = authService.authToken(validLogin);
        res.setHeader('Set-Cookie', `token=${token}; max-age=3600; httpOnly; path=/`).redirect('/todos');
    } else {
        res.render('login', { error: 'Tài khoản hoặc mật khẩu không đúng' });
    }
}

export async function logout(req, res) {
    res.setHeader('Set-Cookie', `token=; max-age=0; path=/`).redirect('/login');
}

export function renderLogin(req, res) {
    res.render('login');
}