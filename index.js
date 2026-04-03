import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import todoRoutes from './routes/todos.js'
import registerRoutes from './routes/register.js'

const app = express()
app.get('/test-view', (req, res) => {
    res.render('login'); 
})
const Port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    req.app.set('views', path.resolve(__dirname, 'views'));
    next();
})

app.use('/', authRoutes)
app.use('/register', registerRoutes)
app.use('/todos', todoRoutes)

/*app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Kết nối OK', time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/

// const sessions = {}

// const db = {
//     users: [
//         {
//             id: 1,
//             email: 'abc@gmail.com',
//             password: '123456',
//             name: 'Doãn Thanh Phương'
//         }
//     ]
// }

// app.get('/login', (req, res, next) => {
//     res.render('login')
// })

// app.post('/login', (req, res, next) => {
//     const { email, password } = req.body
    
//     const user = db.users.find(
//         user => (user.email === email && user.password === password)
//     )

//     if (user) {
//         const sessionId = Date.now().toString();
//         sessions[sessionId] = {
//             userId: user.id
//         }

//         res.setHeader('Set-Cookie', `sessionId=${sessionId}; max-age=3600; httpOnly`).redirect('/todos')
//         return
//     }

//     res.send('Tài khoản hoặc mật khẩu không hợp lệ')
// })

// app.get('/todos', (req, res, next) => {
//     const session = sessions[req.cookies.sessionId]
//     if (!session) {
//         res.redirect('login')
//     }

//     const user = db.users.find(user => user.id === session.userId)
//     if (!user) {
//         res.redirect('/login')
//     }

//     res.render('tasks', { user })
// })

// app.get('/logout', (req, res) => {
//     delete sessions[req.cookies.sessionId]
//     res.setHeader('Set-Cookie', `sessionId=; max-age=0`).redirect('/login')
// })

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`)
})