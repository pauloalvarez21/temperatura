import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreenProps } from '../types/navigation.types';
import Card from '../components/Card';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Datos de características de la app
  const features = [
    {
      icon: '🌡️',
      title: '8 Escalas',
      description:
        'Kelvin, Celsius, Fahrenheit, Rankine, Réaumur, Rømer, Newton, Delisle',
    },
    {
      icon: '⚡',
      title: 'Conversión Rápida',
      description: 'Conversiones instantáneas entre todas las escalas',
    },
    {
      icon: '📊',
      title: 'Comparativa',
      description: 'Tablas comparativas y valores comunes',
    },
    {
      icon: '🎯',
      title: 'Precisión',
      description: 'Hasta 4 decimales de precisión',
    },
  ];

  // Temperaturas destacadas
  const highlightedTemps = [
    { temp: '0°C', label: 'Agua congela', color: '#2196F3' },
    { temp: '100°C', label: 'Agua hierve', color: '#FF5722' },
    { temp: '37°C', label: 'Cuerpo humano', color: '#4CAF50' },
    { temp: '-273.15°C', label: 'Cero absoluto', color: '#9C27B0' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Card style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Conversor de Temperatura</Text>
            <Text style={styles.heroSubtitle}>
              Una herramienta completa para conversión entre 8 escalas de
              temperatura diferentes
            </Text>
            <Text style={styles.heroDescription}>
              Desarrollada por el equipo de Gaelectronica para estudiantes,
              ingenieros y profesionales que necesitan precisión en sus cálculos
              térmicos.
            </Text>
          </View>
        </Card>

        {/* Botones de acción principales */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => navigation.navigate('Convertion')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonIcon}>🌡️</Text>
            <View style={styles.actionButtonTextContainer}>
              <Text style={styles.actionButtonTitle}>Convertir</Text>
              <Text style={styles.actionButtonSubtitle}>Ir al conversor</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('Explanation')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonIcon}>📚</Text>
            <View style={styles.actionButtonTextContainer}>
              <Text style={styles.actionButtonTitle}>Aprender</Text>
              <Text style={styles.actionButtonSubtitle}>Ver escalas</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Características destacadas */}
        <Card style={styles.featuresCard}>
          <Text style={styles.sectionTitle}>
            ✨ Características Principales
          </Text>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Temperaturas destacadas */}
        <Card style={styles.tempsCard}>
          <Text style={styles.sectionTitle}>🔥 Temperaturas Destacadas</Text>

          <View style={styles.tempsGrid}>
            {highlightedTemps.map((temp, index) => (
              <View
                key={index}
                style={[
                  styles.tempItem,
                  { backgroundColor: `${temp.color}15` }, // 15 = 10% opacidad
                ]}
              >
                <Text style={[styles.tempValue, { color: temp.color }]}>
                  {temp.temp}
                </Text>
                <Text style={styles.tempLabel}>{temp.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* CTA Final */}
        <Card style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>¿Listo para empezar?</Text>
          <Text style={styles.ctaDescription}>
            Explora todas las funcionalidades de nuestro conversor avanzado de
            temperatura
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Convertion')}
            activeOpacity={0.7}
          >
            <Text style={styles.ctaButtonText}>Comenzar a Convertir →</Text>
          </TouchableOpacity>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Gaelectronica - Todos los derechos reservados
          </Text>
          <Text style={styles.footerSubtext}>
            Herramienta para conversión de temperatura
          </Text>
          <Text style={styles.footerVersion}>v1.0.0</Text>
        </View>

        {/* Espacio al final */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  heroCard: {
    marginBottom: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 30,
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'CHOWFUN_',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  heroDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actionButtons: {
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  actionButtonTextContainer: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  actionButtonSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  chevron: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  featuresCard: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: width > 400 ? '48%' : '100%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  tempsCard: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  tempsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tempItem: {
    width: width > 400 ? '48%' : '100%',
    alignItems: 'center',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  tempValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tempLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  aboutCard: {
    marginBottom: 20,
    backgroundColor: '#FFF3E0',
  },
  aboutContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aboutIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  aboutIconText: {
    fontSize: 28,
  },
  aboutTextContainer: {
    flex: 1,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#5D4037',
    lineHeight: 20,
    marginBottom: 16,
  },
  aboutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 12,
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#795548',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  ctaCard: {
    marginBottom: 20,
    backgroundColor: '#2196F3',
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  footerVersion: {
    fontSize: 10,
    color: '#BBB',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default HomeScreen;
