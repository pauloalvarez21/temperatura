import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { useTranslation } from 'react-i18next';

// Importar tipos
import { RootTabParamList } from '../types/navigation.types';

// Importar pantallas
import HomeScreen from '../screens/HomeScreen';
import ConvertionScreen from '../screens/ConvertionScreen';
import ExplanationScreen from '../screens/ExplanationScreen';

// Crear el tab navigator con tipos
const Tab = createBottomTabNavigator<RootTabParamList>();

// Componente para el indicador de pestaña con imagen
interface TabIconProps {
  focused: boolean;
  label: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, label }) => {
  // Definir las imágenes para cada pestaña
  const getIconSource = (): ImageSourcePropType => {
    switch (label) {
      case 'Inicio':
        return require('../assets/images/home.png');
      case 'Convertion':
        return require('../assets/images/temperature.png');
      case 'Explicacion':
        return require('../assets/images/info.png');
      default:
        return require('../assets/images/home.png');
    }
  };

  return (
    <View style={styles.tabIconContainer}>
      <Image
        source={getIconSource()}
        style={[
          styles.tabIconImage,
          focused ? styles.tabIconImageActive : styles.tabIconImageInactive,
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const AppNavigator = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let label = '';

            if (route.name === 'Home') {
              label = 'Inicio';
            } else if (route.name === 'Convertion') {
              label = 'Convertion';
            } else if (route.name === 'Explanation') {
              label = 'Explicacion';
            }

            return <TabIcon focused={focused} label={label} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            height: 70,
            paddingBottom: 10,
            paddingTop: 8,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          headerStyle: {
            backgroundColor: '#2196F3',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerTitleAlign: 'center' as const,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t('navigation.home'),
            headerTitle: t('navigation.home'),
          }}
        />
        <Tab.Screen
          name="Convertion"
          component={ConvertionScreen}
          options={{
            title: t('navigation.conversion'),
            headerTitle: t('navigation.conversion'),
          }}
        />
        <Tab.Screen
          name="Explanation"
          component={ExplanationScreen}
          options={{
            title: t('navigation.explanation'),
            headerTitle: t('navigation.explanation'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconImage: {
    width: 150, // Tamaño más realista para íconos
    height: 150,
  },
  tabIconImageActive: {
    // Sin tintColor para mantener colores originales
    opacity: 1, // Mantener opacidad completa
  },
  tabIconImageInactive: {
    // Sin tintColor para mantener colores originales
    opacity: 0.5, // Solo reducir opacidad, no cambiar color
  },
});

export default AppNavigator;
