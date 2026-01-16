// Tipos para las escalas de temperatura
export type TemperatureScale =
  | 'kelvin'
  | 'celsius'
  | 'fahrenheit'
  | 'rankine'
  | 'reaumur'
  | 'romer'
  | 'newton'
  | 'delisle';

// Interfaz para cada escala
export interface TemperatureScaleInfo {
  name: string;
  symbol: string;
  description: string;
}

// Información de cada escala
export const temperatureScales: Record<TemperatureScale, TemperatureScaleInfo> =
  {
    kelvin: {
      name: 'scales.kelvin.name',
      symbol: 'K',
      description: 'scales.kelvin.description',
    },
    celsius: {
      name: 'scales.celsius.name',
      symbol: '°C',
      description: 'scales.celsius.description',
    },
    fahrenheit: {
      name: 'scales.fahrenheit.name',
      symbol: '°F',
      description: 'scales.fahrenheit.description',
    },
    rankine: {
      name: 'scales.rankine.name',
      symbol: '°R',
      description: 'scales.rankine.description',
    },
    reaumur: {
      name: 'scales.reaumur.name',
      symbol: '°Ré',
      description: 'scales.reaumur.description',
    },
    romer: {
      name: 'scales.romer.name',
      symbol: '°Rø',
      description: 'scales.romer.description',
    },
    newton: {
      name: 'scales.newton.name',
      symbol: '°N',
      description: 'scales.newton.description',
    },
    delisle: {
      name: 'scales.delisle.name',
      symbol: '°De',
      description: 'scales.delisle.description',
    },
  };

// Función principal de conversión
export const convertTemperature = (
  value: number,
  fromScale: TemperatureScale,
  toScale: TemperatureScale,
): number => {
  // Primero convierte a Celsius como punto intermedio
  const celsiusValue = toCelsius(value, fromScale);

  // Luego convertir de Celsius a la escala destino
  return fromCelsius(celsiusValue, toScale);
};

// Convertir de cualquier escala a Celsius
const toCelsius = (value: number, scale: TemperatureScale): number => {
  switch (scale) {
    case 'kelvin':
      return value - 273.15;
    case 'celsius':
      return value;
    case 'fahrenheit':
      return ((value - 32) * 5) / 9;
    case 'rankine':
      return ((value - 491.67) * 5) / 9;
    case 'reaumur':
      return (value * 5) / 4;
    case 'romer':
      return ((value - 7.5) * 40) / 21;
    case 'newton':
      return (value * 100) / 33;
    case 'delisle':
      return 100 - (value * 2) / 3;
    default:
      return value;
  }
};

// Convertir de Celsius a cualquier escala
const fromCelsius = (value: number, scale: TemperatureScale): number => {
  switch (scale) {
    case 'kelvin':
      return value + 273.15;
    case 'celsius':
      return value;
    case 'fahrenheit':
      return (value * 9) / 5 + 32;
    case 'rankine':
      return ((value + 273.15) * 9) / 5;
    case 'reaumur':
      return (value * 4) / 5;
    case 'romer':
      return (value * 21) / 40 + 7.5;
    case 'newton':
      return (value * 33) / 100;
    case 'delisle':
      return ((100 - value) * 3) / 2;
    default:
      return value;
  }
};

// Función para formatear el resultado
export const formatTemperature = (
  value: number,
  scale: TemperatureScale,
  decimals: number = 2,
): string => {
  const scaleInfo = temperatureScales[scale];
  const formattedValue = value.toFixed(decimals);
  return `${formattedValue} ${scaleInfo.symbol}`;
};
