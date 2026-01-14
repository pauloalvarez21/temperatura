import temperatureScalesData from '../data/temperatureScales.json';
import { TemperatureScalesData } from '../types/temperatureScales';

// Cargar datos del JSON
export const loadTemperatureScalesData = (): TemperatureScalesData => {
  return temperatureScalesData as TemperatureScalesData;
};

// Función para convertir temperatura a diferentes escalas
export const convertToAllScales = (celsius: number): Record<string, string> => {
  return {
    kelvin: `${(celsius + 273.15).toFixed(1)} K`,
    celsius: `${celsius.toFixed(1)} °C`,
    fahrenheit: `${((celsius * 9) / 5 + 32).toFixed(1)} °F`,
    rankine: `${((celsius * 9) / 5 + 32 + 459.67).toFixed(1)} °R`,
    reaumur: `${(celsius * 0.8).toFixed(1)} °Ré`,
    romer: `${((celsius * 21) / 40 + 7.5).toFixed(1)} °Rø`,
    newton: `${(celsius * 0.33).toFixed(1)} °N`,
    delisle: `${((100 - celsius) * 1.5).toFixed(1)} °De`,
  };
};

// Función para obtener escala por ID
export const getScaleById = (id: number) => {
  const data = loadTemperatureScalesData();
  return data.temperatureScales.find(scale => scale.id === id);
};

// Función para obtener escala por nombre
export const getScaleByName = (name: string) => {
  const data = loadTemperatureScalesData();
  return data.temperatureScales.find(scale =>
    scale.name.toLowerCase().includes(name.toLowerCase()),
  );
};
