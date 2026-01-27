/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// Mock de Navigation y dependencias nativas
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: any) => <>{children}</>,
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: any) => <>{children}</>,
    Screen: () => null,
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => <>{children}</>,
  SafeAreaView: ({ children }: any) => <>{children}</>,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

jest.mock('react-native-google-mobile-ads', () => ({
  BannerAd: () => null,
  BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: 'BANNER' },
  TestIds: { ADAPTIVE_BANNER: 'test-id' },
  useForeground: jest.fn(),
}));

jest.mock('react-native-localize', () => ({
  getLocales: () => [{ languageCode: 'es', countryCode: 'ES', isRTL: false }],
  findBestAvailableLanguage: () => ({ languageTag: 'es', isRTL: false }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
