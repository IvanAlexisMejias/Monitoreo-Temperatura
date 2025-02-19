import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            alert(response.data.message);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            alert('Error en el login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full" >
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                {/* Advertencia sobre envío de correos */}
                <p className="text-sm text-red-600 mb-4 text-center">
                    Al iniciar sesión, se enviarán correos de alerta si la temperatura supera el umbral.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Iniciar sesión
                    </button>
                </form>

                {/* Enlace a Registro */}
                <p className="mt-4 text-center">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}