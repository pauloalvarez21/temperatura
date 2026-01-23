import React, { useState, useRef, useEffect } from 'react';
import { StatusBar, StyleSheet, Animated } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/components/SplashScreen';

import './src/i18n';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Simular carga de recursos (puedes agregar lógica real aquí)
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSplashFinish = () => {
    // Animar la desaparición del splash
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSplash(false);
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
        
        {/* Renderizar la app principal siempre, pero oculta */}
        {appReady && <AppNavigator />}
        
        {/* Splash screen con animación de fade out */}
        {showSplash && (
          <Animated.View 
            style={[
              styles.splashContainer,
              { opacity: fadeAnim }
            ]}
            pointerEvents={showSplash ? 'auto' : 'none'}
          >
            <SplashScreen onFinish={handleSplashFinish} />
          </Animated.View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});

export default App;
