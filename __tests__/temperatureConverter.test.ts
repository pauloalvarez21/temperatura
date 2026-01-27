import { convertTemperature, formatTemperature } from '../src/utils/temperatureConverter';

describe('temperatureConverter', () => {
  describe('convertTemperature', () => {
    test('convierte correctamente de Celsius a Fahrenheit', () => {
      // 0°C = 32°F
      expect(convertTemperature(0, 'celsius', 'fahrenheit')).toBe(32);
      // 100°C = 212°F
      expect(convertTemperature(100, 'celsius', 'fahrenheit')).toBe(212);
    });

    test('convierte correctamente de Celsius a Kelvin', () => {
      // 0°C = 273.15K
      expect(convertTemperature(0, 'celsius', 'kelvin')).toBe(273.15);
    });

    test('convierte correctamente de Fahrenheit a Celsius', () => {
      // 32°F = 0°C
      expect(convertTemperature(32, 'fahrenheit', 'celsius')).toBeCloseTo(0);
    });
    
    test('mantiene el mismo valor si el origen y destino son iguales', () => {
      expect(convertTemperature(25, 'celsius', 'celsius')).toBe(25);
      expect(convertTemperature(300, 'kelvin', 'kelvin')).toBe(300);
    });
  });

  describe('formatTemperature', () => {
    test('formatea correctamente con decimales por defecto (2)', () => {
      expect(formatTemperature(25.5, 'celsius')).toBe('25.50 °C');
    });

    test('formatea correctamente con una cantidad específica de decimales', () => {
      expect(formatTemperature(25.5678, 'celsius', 1)).toBe('25.6 °C');
      expect(formatTemperature(300, 'kelvin', 0)).toBe('300 K');
    });

    test('usa el símbolo correcto para diferentes escalas', () => {
      expect(formatTemperature(32, 'fahrenheit')).toContain('°F');
      expect(formatTemperature(100, 'rankine')).toContain('°R');
    });
  });
});
