import { useState } from 'react';

function ThresholdForm({ setThreshold }) {
    const [inputValue, setInputValue] = useState(30);

    const handleSubmit = (e) => {
        e.preventDefault();
        setThreshold(inputValue);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <label className="text-lg mb-2">Definir Umbral de Temperatura:</label>
            <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-2 rounded-lg"
            />
            <button
                type="submit"
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                Establecer Umbral
            </button>
        </form>
    );
}

export default ThresholdForm;
