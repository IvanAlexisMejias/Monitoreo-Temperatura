import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', { email, password });
            alert(response.data.message);
            // Redireccionar a login después de registro exitoso
            navigate('/');
        } catch (error) {
            alert('Error en el registro');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
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
                        Registrarse
                    </button>
                </form>

                {/* Enlace a Login por si ya tiene cuenta */}
                <p className="mt-4 text-center">
                    ¿Ya tienes una cuenta?{' '}
                    <a href="/" className="text-blue-600 hover:underline">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    );
}