const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
    },
});

let users = [];
let temperature = 20;
let threshold = 30;

// Configuración de transporte de Nodemailer 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ivanalexismejias1@gmail.com',  // Reemplaza con tu correo
        pass: 'rbec zofb qivc vene',  // Contraseña de aplicación de Gmail
    },
    tls: {
        rejectUnauthorized: false,  // Permitir certificados autofirmados
    },
});

// Simulación de temperatura cada 5 segundos
setInterval(() => {
    temperature = Math.random() * (40 - 15) + 15;
    io.emit('temperatureUpdate', { temperature, threshold });
    checkTemperatureThreshold();
}, 5000);

// Verifica si la temperatura supera el umbral y envía correos
function checkTemperatureThreshold() {
    if (temperature > threshold) {
        users.forEach(user => {
            sendEmail(user.email, temperature);
        });
    }
}

// Función para enviar correos
function sendEmail(email, temp) {
    const mailOptions = {
        from: 'ivan.mejiasm@gmail.com',  // Correo del remitente
        to: email,  // Correo del usuario logueado
        subject: 'Alerta de Temperatura',
        text: `¡Alerta! La temperatura ha superado el umbral. Temperatura actual: ${temp.toFixed(2)}°C`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error enviando correo:', error);
        } else {
            console.log('Correo enviado a:', email);
        }
    });
}

// Ruta de prueba para verificar el envío de correos
app.get('/test-email', (req, res) => {
    const mailOptions = {
        from: 'ivan.mejiasm@gmail.com',
        to: 'correo.destino@example.com',  // Correo de prueba
        subject: 'Prueba de Envío de Correo',
        text: 'Este es un correo de prueba para verificar Nodemailer.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error enviando correo:', error);
            res.status(500).send('Error al enviar correo');
        } else {
            console.log('Correo enviado:', info.response);
            res.send('Correo enviado correctamente');
        }
    });
});

// Ruta de registro de usuarios
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ email, password: hashedPassword });
    res.json({ message: 'Usuario registrado correctamente' });
});

// Ruta de login de usuarios
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email }, 'secreto', { expiresIn: '1h' });
        res.json({ success: true, token, message: 'Inicio de sesión exitoso' });
    } else {
        res.json({ success: false, message: 'Credenciales inválidas' });
    }
});

app.post('/cores', (req, res) => {
    io.emit('coresUsage', { data: req.body});
});

// Middleware para proteger rutas
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    
    jwt.verify(token.split(' ')[1], 'secreto', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Ruta protegida para obtener temperatura
app.get('/protected/temperature', authenticateToken, (req, res) => {
    res.json({ temperature, threshold });
});

// Manejo de WebSockets
io.on('connection', (socket) => {
    console.log('Cliente conectado');
    socket.emit('temperatureUpdate', { temperature, threshold });

    socket.on('setThreshold', (newThreshold) => {
        threshold = newThreshold;
        io.emit('temperatureUpdate', { temperature, threshold });
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar servidor
server.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
