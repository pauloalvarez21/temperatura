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

// Mapeo de nombres de ruta a fuentes de íconos
const iconMapping: Record<keyof RootTabParamList, ImageSourcePropType> = {
  Home: require('../assets/images/home.png'),
  Convertion: require('../assets/images/temperature.png'),
  Explanation: require('../assets/images/info.png'),
};

// Componente reutilizable para el ícono de la pestaña
interface TabIconProps {
  focused: boolean;
  source: ImageSourcePropType;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, source }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Image
        source={source}
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
          headerShown: false, // Oculta el header para todas las pestañas
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={iconMapping[route.name]} />
          ),
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
            fontFamily: 'ChowFun-Regular',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t('navigation.home'),
          }}
        />
        <Tab.Screen
          name="Convertion"
          component={ConvertionScreen}
          options={{
            title: t('navigation.conversion'),
          }}
        />
        <Tab.Screen
          name="Explanation"
          component={ExplanationScreen}
          options={{
            title: t('navigation.explanation'),
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
    width: 150,
    height: 150,
  },
  tabIconImageActive: {
    opacity: 1, // Mantener opacidad completa
  },
  tabIconImageInactive: {
    opacity: 0.5, // Solo reducir opacidad, no cambiar color
  },
});

export default AppNavigator;
