import React from 'react';
import renderer from 'react-test-renderer';
import ExplanationScreen from '../src/screens/ExplanationScreen';

// 1. Mock de i18n e i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
        if (options && options.count !== undefined) return `${key}_plural`;
        return key;
    },
  }),
}));

jest.mock('i18next', () => ({
  language: 'es',
  use: () => ({
    init: () => {},
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


describe('ExplanationScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('se renderiza correctamente', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderer.create(
        <ExplanationScreen {...({ navigation: mockNavigation as any, route: {} as any } as any)} />
      );
    });
    
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  test('muestra el título de la sección de explicación', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderer.create(
        <ExplanationScreen {...({ navigation: mockNavigation as any, route: {} as any } as any)} />
      );
    });
    
    const instance = component.root;
    // Buscamos el texto de la traducción 'explanation.title'
    const titleElements = instance.findAll((el: any) => 
      el.props.children === 'explanation.title'
    );
    expect(titleElements.length).toBeGreaterThan(0);
  });
});
