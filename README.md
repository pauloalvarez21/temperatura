# Temperatura - Conversor de Temperaturas Pro

Una aplicación móvil moderna de **React Native** diseñada para la conversión precisa de temperaturas, acompañada de contenido educativo detallado sobre diversas escalas termométricas.

![Banner](file:///g:/programacion/react/temperatura/src/assets/images/logo.png)

## ✨ Características Principales

- **Conversión Multiescala**: Soporte para 8 escalas diferentes:
  - Celsius (°C)
  - Fahrenheit (°F)
  - Kelvin (K)
  - Rankine (°R)
  - Réaumur (°Ré)
  - Rømer (°Rø)
  - Newton (°N)
  - Delisle (°De)
- **Contenido Educativo**: Pantalla dedicada a la historia, fórmulas y curiosidades de cada escala.
- **Tabla Comparativa Interactiva**: Visualiza equivalencias entre todas las escalas de forma dinámica.
- **Interfaz Premium**: Diseño moderno con animaciones fluidas, tipografía personalizada y experiencia de usuario optimizada.
- **Internacionalización**: Soporte completo para Español e Inglés.
- **Monetización**: Integración con Google Mobile Ads (AdMob).

## 🚀 Tecnologías Utilizadas

- **React Native** (v0.73.2)
- **TypeScript** para un tipado robusto.
- **React Navigation** (Bottom Tabs) para el flujo de la app.
- **i18next** para la gestión de idiomas.
- **React Native Google Mobile Ads** para publicidad.
- **React Native Safe Area Context** para soporte de diversos dispositivos.

## 🛠️ Estructura del Proyecto

```text
src/
├── assets/      # Imágenes y fuentes personalizadas
├── components/  # Componentes reutilizables (Card, Splash)
├── data/        # Datos estáticos de escalas (JSON)
├── hooks/       # Lógica de negocio (useTemperatureConverter)
├── i18n/        # Configuración de traducciones
├── navigation/  # Configuración de rutas
├── screens/     # Pantallas principales (Home, Conversion, Explanation)
├── types/       # Definiciones de TypeScript
└── utils/       # Funciones auxiliares de cálculo y carga
```

## 📦 Instalación

1. **Clonar el repositorio**:
   ```sh
   git clone <url-del-repositorio>
   cd temperatura
   ```

2. **Instalar dependencias**:
   ```sh
   npm install
   # o
   yarn install
   ```

3. **iOS (Solo macOS)**:
   ```sh
   cd ios && pod install && cd ..
   ```

## 🏃 Ejecución

### Android
```sh
npm run android
```

### iOS
```sh
npm run ios
```

## 📝 Documentación Interna

El proyecto utiliza **JSDoc** para documentar todos los componentes, hooks y utilidades. Puedes consultar la documentación directamente sobre el código en tu editor favorito.

---
Desarrollado con ❤️ para proporcionar la mejor experiencia en conversión de temperatura.
