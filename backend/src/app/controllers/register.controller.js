import * as registerService from '../services/register.service.js';

export async function createNewUser(req, res) {
    try {
        await registerService.registerUser(req.body);
        res.status(201).json({ 
            success: true, 
            message: 'Đăng ký thành công' 
        });
    } catch (err) {
        res.status(400).json({ 
            success: false, 
            error: 'Tên đăng nhập đã tồn tại hoặc đã xảy ra lỗi' 
        });
    }
}