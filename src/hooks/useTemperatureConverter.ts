import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TemperatureScale,
  convertTemperature,
  formatTemperature,
  temperatureScales,
} from '../utils/temperatureConverter';

interface UseTemperatureConverterProps {
  initialValue?: number;
  initialFromScale?: TemperatureScale;
  initialToScale?: TemperatureScale;
}

const useTemperatureConverter = ({
  initialValue = 0,
  initialFromScale = 'celsius',
  initialToScale = 'fahrenheit',
}: UseTemperatureConverterProps = {}) => {
  const { t } = useTranslation();
  // Estados
  const [inputValue, setInputValue] = useState<string>(initialValue.toString());
  const [fromScale, setFromScale] =
    useState<TemperatureScale>(initialFromScale);
  const [toScale, setToScale] = useState<TemperatureScale>(initialToScale);
  const [convertedValue, setConvertedValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Validar y convertir el valor
  const validateAndConvert = (value: string) => {
    setInputValue(value);

    if (value === '' || value === '-') {
      setConvertedValue(0);
      setError(null);
      return;
    }

    const numValue = Number.parseFloat(value);

    if (Number.isNaN(numValue)) {
      setError(t('errors.invalidNumber'));
      setConvertedValue(0);
      return;
    }

    setError(null);

    try {
      const result = convertTemperature(numValue, fromScale, toScale);
      setConvertedValue(result);
    } catch (err) {
      setError(t('errors.conversionError') + err);
      setConvertedValue(0);
    }
  };

  // Efecto para recalcular cuando cambian las escalas
  useEffect(() => {
    if (inputValue && inputValue !== '' && inputValue !== '-') {
      const numValue = Number.parseFloat(inputValue);
      if (!Number.isNaN(numValue)) {
        const result = convertTemperature(numValue, fromScale, toScale);
        setConvertedValue(result);
      }
    }
  }, [fromScale, inputValue, toScale]);

  // Establecer un valor común
  const setCommonTemperature = (celsiusValue: number, _description: string) => {
    const valueInFromScale = convertTemperature(
      celsiusValue,
      'celsius',
      fromScale,
    );
    setInputValue(valueInFromScale.toString());
  };

  // Resetear
  const reset = () => {
    setInputValue('0');
    setFromScale('celsius');
    setToScale('fahrenheit');
    setConvertedValue(0);
    setError(null);
  };

  return {
    // Estados
    inputValue,
    fromScale,
    toScale,
    convertedValue,
    error,

    // Setters
    setInputValue: validateAndConvert,
    setFromScale,
    setToScale,

    // Funciones
    setCommonTemperature,
    reset,

    // Utilidades
    formatResult: (decimals: number = 2) =>
      formatTemperature(convertedValue, toScale, decimals),
    getScaleInfo: (scale: TemperatureScale) => {
      const info = temperatureScales[scale];
      return {
        ...info,
        name: t(info.name),
        description: t(info.description),
      };
    },
    allScales: Object.keys(temperatureScales) as TemperatureScale[],
  };
};

export default useTemperatureConverter;
