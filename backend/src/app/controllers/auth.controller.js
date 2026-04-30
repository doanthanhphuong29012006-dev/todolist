import * as authService from '../services/auth.service.js';

export async function login(req, res) {
    try {
        const validLogin = await authService.checkValidLogin(req.body);
        if (validLogin) {
            const token = authService.authToken(validLogin);
            res.setHeader('Set-Cookie', `token=${token}; max-age=3600; httpOnly; path=/`).status(200).json({
                success: true, 
                message: 'Đăng nhập thành công', 
                user: validLogin.username
            });
        } else {
            res.status(401).json({ 
                success: false, 
                error: 'Tài khoản hoặc mật khẩu không đúng' 
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false, 
            error: 'Lỗi Server' 
        });
    }
}

export async function logout(req, res) {
    res.setHeader('Set-Cookie', `token=; max-age=0; path=/`).status(200).json({ 
        success: true, 
        message: 'Đăng xuất thành công' 
    });
}