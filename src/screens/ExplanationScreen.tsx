import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { ExplanationScreenProps } from '../types/navigation.types';
import Card from '../components/Card';
import {
  loadTemperatureScalesData,
  convertToAllScales,
} from '../utils/dataLoader';
import { TemperatureScaleData } from '../types/temperatureScales';

const { width } = Dimensions.get('window');

const ExplanationScreen: React.FC<ExplanationScreenProps> = () => {
  const { t } = useTranslation();

  const data = loadTemperatureScalesData();
  const {
    temperatureScales,
    commonTemperatures,
    curiosities,
    introText,
    finalNote,
  } = data;

  const renderScaleCard = (scale: TemperatureScaleData) => (
    <Card key={scale.id}>
      <View style={styles.cardHeader}>
        <View style={[styles.symbolBadge, { backgroundColor: scale.color }]}>
          <Text style={styles.symbolText}>{scale.symbol}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.scaleName}>
            {scale.name} ({scale.symbol})
          </Text>
          <Text style={styles.inventor}>
            {scale.inventor} ({scale.year})
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{scale.description}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📌 {t('explanation.keyPoints')}</Text>
        {scale.keyPoints.map((point, index) => (
          <View key={index} style={styles.pointItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧮 {t('explanation.formula')}</Text>
        <Card style={styles.formulaCard}>
          <Text style={styles.formulaText}>{scale.formula}</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 {t('explanation.usage')}</Text>
        <View style={styles.usageContainer}>
          <Text style={styles.usageText}>{scale.usage}</Text>
        </View>
      </View>
    </Card>
  );

  const renderComparisonTable = () => (
    <Card style={styles.comparisonCard}>
      <Text style={styles.comparisonTitle}>
        📊 {t('explanation.comparison.title')}
      </Text>
      <Text style={styles.comparisonSubtitle}>
        {t('explanation.comparison.subtitle')}
      </Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.firstColumn]}>
            {t('explanation.comparison.temperature')}
          </Text>
          {temperatureScales.map(scale => (
            <View key={scale.id} style={styles.headerScaleCell}>
              <Text style={styles.headerScaleSymbol}>{scale.symbol}</Text>
            </View>
          ))}
        </View>

        {commonTemperatures.map((temp, index) => {
          const convertedValues = convertToAllScales(temp.celsius);
          return (
            <View
              key={index}
              style={[styles.tableRow, index % 2 === 0 && styles.tableRowEven]}
            >
              <View style={[styles.tableCell, styles.firstColumn]}>
                <Text style={styles.tempName}>{temp.name}</Text>
                <Text style={styles.tempCelsius}>({temp.celsius}°C)</Text>
              </View>

              {temperatureScales.map(scale => (
                <View key={scale.id} style={styles.tableCell}>
                  <Text style={styles.tempValue}>
                    {
                      convertedValues[
                        scale.name
                          .toLowerCase()
                          .replace('grado ', '')
                          .replace(' ', '')
                      ]
                    }
                  </Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.titleCard}>
          <Text style={styles.title}>🌡️ {t('explanation.title')}</Text>
          <Text style={styles.subtitle}>
            {t('explanation.subtitle', {
              count: temperatureScales.length,
            })}
          </Text>
          <Text style={styles.introText}>{t('explanation.intro')}</Text>
        </Card>

        <Card style={styles.introCard}>
          <Text style={styles.introCardTitle}>{introText.title}</Text>
          <Text style={styles.introCardText}>{introText.description}</Text>
        </Card>

        <Text style={styles.sectionHeader}>
          📚{' '}
          {t('explanation.sectionScales', {
            count: temperatureScales.length,
          })}
        </Text>

        {temperatureScales.map(renderScaleCard)}

        {renderComparisonTable()}

        <Card style={styles.curiositiesCard}>
          <Text style={styles.curiositiesTitle}>
            🔍 {t('explanation.curiosities')}
          </Text>

          {curiosities.map((curiosity, index) => (
            <View key={index} style={styles.curiosityItem}>
              <Text style={styles.curiosityIcon}>{curiosity.icon}</Text>
              <Text style={styles.curiosityText}>{curiosity.text}</Text>
            </View>
          ))}
        </Card>

        <Card style={styles.finalNoteCard}>
          <Text style={styles.finalNoteTitle}>{finalNote.title}</Text>
          <Text style={styles.finalNoteText}>{finalNote.text}</Text>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos (igual que antes, pero más organizados)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  titleCard: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: 12,
  },
  introText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  introCard: {
    marginBottom: 20,
    backgroundColor: '#E3F2FD',
  },
  introCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  introCardText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  introPoints: {
    marginLeft: 8,
  },
  introPoint: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
    paddingLeft: 8,
  },
  scaleCard: {
    marginBottom: 20,
    borderLeftWidth: 6,
    borderLeftColor: '#2196F3',
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  symbolBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  symbolText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerContent: {
    flex: 1,
  },
  scaleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  inventor: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pointItem: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
    marginTop: 2,
  },
  pointText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  formulaCard: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    marginTop: 4,
  },
  formulaText: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#D32F2F',
    textAlign: 'center',
  },
  usageContainer: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  usageText: {
    fontSize: 14,
    color: '#2E7D32',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  historyCard: {
    marginBottom: 20,
    backgroundColor: '#FFF3E0',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  historyYear: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
    width: 60,
    marginRight: 12,
  },
  historyText: {
    flex: 1,
    fontSize: 13,
    color: '#5D4037',
    lineHeight: 18,
  },
  comparisonCard: {
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  comparisonSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    borderBottomWidth: 1,
    borderBottomColor: '#1976D2',
  },
  headerCell: {
    padding: 12,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  firstColumn: {
    width: width * 0.25,
  },
  headerScaleCell: {
    width: (width * 0.75) / 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerScaleSymbol: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tableRowEven: {
    backgroundColor: '#F8F9FA',
  },
  tableCell: {
    width: (width * 0.75) / 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 2,
  },
  tempCelsius: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  tempValue: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
  },
  curiositiesCard: {
    marginBottom: 20,
    backgroundColor: '#E8EAF6',
  },
  curiositiesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3949AB',
    marginBottom: 16,
    textAlign: 'center',
  },
  curiosityItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  curiosityIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  curiosityText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  finalNoteCard: {
    marginBottom: 20,
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  finalNoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00838F',
    marginBottom: 12,
    textAlign: 'center',
  },
  finalNoteText: {
    fontSize: 14,
    color: '#006064',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomSpacer: {
    height: 30,
  },
});

export default ExplanationScreen;
