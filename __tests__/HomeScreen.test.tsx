import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../src/screens/HomeScreen';

// Mock de i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock de Anuncios
jest.mock('react-native-google-mobile-ads', () => {
  const React = require('react');
  return {
    BannerAd: React.forwardRef((props: any, ref: any) => null),
    BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: 'BANNER' },
    TestIds: { ADAPTIVE_BANNER: 'test-id' },
    useForeground: jest.fn(),
  };
});

// Mock de Safe Area
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => <>{children}</>,
}));

describe('HomeScreen', () => {
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
        <HomeScreen {...({ navigation: mockNavigation as any, route: {} as any } as any)} />
      );
    });
    
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  test('contiene el texto del título principal', async () => {
    let component: any;
    await renderer.act(async () => {
      component = renderer.create(
        <HomeScreen {...({ navigation: mockNavigation as any, route: {} as any } as any)} />
      );
    });
    
    const instance = component.root;
    // Buscamos cualquier componente que contenga el texto de la traducción mockeada
    const titleElements = instance.findAll((el: any) => 
      el.props.children === 'home.title'
    );
    expect(titleElements.length).toBeGreaterThan(0);
  });
});
