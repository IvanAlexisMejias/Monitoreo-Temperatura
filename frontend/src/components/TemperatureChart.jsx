import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
);

function TemperatureChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Temperatura (°C)',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
        }],
    });
    const [alertColor, setAlertColor] = useState('green');
    const [alertMessage, setAlertMessage] = useState('');
    const [threshold, setThreshold] = useState(30);
    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
        socket.on('temperatureUpdate', ({ temperature, threshold }) => {
            setTemperature(temperature);
            setThreshold(threshold);
            const time = new Date().toLocaleTimeString();

            setChartData((prevData) => {
                const newData = { ...prevData };
                newData.labels.push(time);
                newData.datasets[0].data.push(temperature);

                if (newData.labels.length > 20) {
                    newData.labels.shift();
                    newData.datasets[0].data.shift();
                }

                // Anotación del umbral horizontal (paralela al eje X)
                newData.options = {
                    plugins: {
                        annotation: {
                            annotations: {
                                thresholdLine: {
                                    type: 'line',
                                    yMin: threshold,
                                    yMax: threshold,
                                    borderColor: 'rgb(255, 0, 0)',
                                    borderWidth: 2,
                                    label: {
                                        enabled: true,
                                        content: `Umbral: ${threshold}°C`
                                    }
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        }
                    }
                };

                // Lógica de alerta superior
                if (temperature > threshold) {
                    setAlertMessage('⚠️ ¡Temperatura fuera del umbral!');
                    setAlertColor('red');
                } else if (temperature > threshold - 3) {
                    setAlertMessage('⚠️ Temperatura cercana al umbral.');
                    setAlertColor('orange');
                } else {
                    setAlertMessage('✅ Temperatura dentro del umbral.');
                    setAlertColor('green');
                }
                return newData;
            });
        });
        socket.on('coresUsage', (data)=> console.log(data));
    }, []);

    const handleThresholdChange = (e) => {
        const newThreshold = parseFloat(e.target.value);
        setThreshold(newThreshold);
        socket.emit('setThreshold', newThreshold);
    };

    return (
        <div style={{ width: '80%', maxWidth: '800px', margin: '50px auto', height: 'auto', textAlign: 'center' }}>
            <h1>Monitoreo de Temperatura</h1>
            {alertMessage && (
                <div style={{
                    padding: '15px',
                    marginBottom: '30px',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '18px',
                    backgroundColor: alertColor
                }}>
                    {alertMessage}
                </div>
            )}
            <div style={{ height: '500px' }}>
                <Line id="temperature-chart" data={chartData} options={chartData.options} />
            </div>
            <div style={{ marginTop: '30px' }}>
                <label>Definir Umbral de Temperatura:</label>
                <input
                    type="number"
                    onChange={handleThresholdChange}
                    value={threshold}
                    style={{ marginLeft: '10px', width: '120px', padding: '8px' }}
                />
            </div>
        </div>
    );
}

export default TemperatureChart;
