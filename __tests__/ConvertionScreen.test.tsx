import React from 'react';
import renderer from 'react-test-renderer';
import ConvertionScreen from '../src/screens/ConvertionScreen';

// 1. Mock de i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// 2. Mock de Anuncios
jest.mock('react-native-google-mobile-ads', () => {
  const React = require('react');
  return {
    BannerAd: React.forwardRef((props: any, ref: any) => null),
    BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: 'BANNER' },
    TestIds: { ADAPTIVE_BANNER: 'test-id' },
    useForeground: jest.fn(),
  };
});

// 3. Mock de Safe Area
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => <>{children}</>,
}));

// 4. Mock del Picker
jest.mock('@react-native-picker/picker', () => {
  const React = require('react');
  const View = require('react-native').View;
  
  const Picker = (props: any) => {
    return React.createElement('Picker', props, props.children);
  };
  
  Picker.Item = (props: any) => {
    return React.createElement('Picker.Item', props);
  };
  
  return {
    Picker,
  };
});

describe('ConvertionScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('se renderiza correctamente', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderer.create(<ConvertionScreen />);
    });
    
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  test('muestra el título de conversión', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderer.create(<ConvertionScreen />);
    });
    
    const instance = component.root;
    // Buscamos el texto de la traducción 'conversion.title'
    const titleElements = instance.findAll((el: any) => 
      el.props.children === 'conversion.title'
    );
    expect(titleElements.length).toBeGreaterThan(0);
  });
});
