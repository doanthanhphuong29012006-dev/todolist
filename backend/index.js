import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routers/auth.route.js';
import registerRoutes from './routers/register.route.js';
import todoRoutes from './routers/todo.route.js';

const app = express();
const Port = process.env.PORT || 3000;

// Cấu hình đường dẫn cho views và public (vì chúng nằm ở thư mục /frontend bên ngoài /backend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.set('views', path.join(__dirname, '../frontend/views'));
// app.set('view engine', 'ejs');

// app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use('/', authRoutes);
app.use('/register', registerRoutes);
app.use('/todos', todoRoutes);

app.use((req, res) => {
  res.status(404).send('Không tìm thấy trang yêu cầu');
});

app.listen(Port, () => {
  console.log(`http://localhost:${Port}`);
});