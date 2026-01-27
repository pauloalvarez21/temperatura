import React from 'react';
import renderer from 'react-test-renderer';
import useTemperatureConverter from '../src/hooks/useTemperatureConverter';

// Mock de traducciones
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('useTemperatureConverter Hook', () => {
  // Componente auxiliar para capturar el estado del hook
  const HookWrapper = ({ callback, initialProps }: any) => {
    const hookData = useTemperatureConverter(initialProps);
    callback(hookData);
    return null;
  };

  test('debe inicializarse con valores correctos', async () => {
    let hookResult: any;
    await renderer.act(() => {
      renderer.create(
        <HookWrapper 
          callback={(data: any) => (hookResult = data)} 
        />
      );
    });

    expect(hookResult.inputValue).toBe('0');
    expect(hookResult.fromScale).toBe('celsius');
    expect(hookResult.toScale).toBe('fahrenheit');
  });

  test('debe actualizar el valor convertido cuando cambia el input', async () => {
    let hookResult: any;
    let component: any;
    
    await renderer.act(() => {
      component = renderer.create(
        <HookWrapper callback={(data: any) => (hookResult = data)} />
      );
    });

    await renderer.act(() => {
      // 100°C debería convertirse a 212°F
      hookResult.setInputValue('100');
    });

    expect(hookResult.convertedValue).toBe(212);
  });

  test('la función reset debe restaurar los valores iniciales', async () => {
    let hookResult: any;
    
    await renderer.act(() => {
      renderer.create(
        <HookWrapper callback={(data: any) => (hookResult = data)} />
      );
    });

    await renderer.act(() => {
      hookResult.setInputValue('50');
      hookResult.setFromScale('kelvin');
    });

    await renderer.act(() => {
      hookResult.reset();
    });

    expect(hookResult.inputValue).toBe('0');
    expect(hookResult.fromScale).toBe('celsius');
  });
});
