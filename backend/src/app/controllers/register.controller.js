import * as registerService from '../services/register.service.js';

export function renderRegister(req, res) {
    res.render('register');
}

export async function createNewUser(req, res) {
    try {
        await registerService.registerUser(req.body);
        res.redirect('/login');
    } catch (err) {
        res.render('register', { error: 'Tên đăng nhập đã tồn tại hoặc đã xảy ra lỗi' });
    }
}