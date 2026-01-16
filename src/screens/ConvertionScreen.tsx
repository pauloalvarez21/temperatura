import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

import Card from '../components/Card';
import useTemperatureConverter from '../hooks/useTemperatureConverter';
import { TemperatureScale } from '../utils/temperatureConverter';

const { width } = Dimensions.get('window');

const ConvertionScreen = () => {
  const { t } = useTranslation();

  const {
    inputValue,
    fromScale,
    toScale,
    convertedValue,
    error,
    setInputValue,
    setFromScale,
    setToScale,
    swapScales,
    reset,
    formatResult,
    getScaleInfo,
    allScales,
  } = useTemperatureConverter();

  const [decimals, setDecimals] = useState<number>(2);

  const renderScaleSelector = (
    selectedScale: TemperatureScale,
    onScaleChange: (scale: TemperatureScale) => void,
    label: string,
  ) => {
    const scaleInfo = getScaleInfo(selectedScale);

    return (
      <Card style={styles.scaleSelectorCard}>
        <Text style={styles.selectorLabel}>{label}</Text>

        <View style={styles.scaleInfo}>
          <Text style={styles.scaleName}>{scaleInfo.name}</Text>
          <Text style={styles.scaleSymbol}>{scaleInfo.symbol}</Text>
        </View>

        <Text style={styles.scaleDescription}>{scaleInfo.description}</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedScale}
            onValueChange={itemValue =>
              onScaleChange(itemValue as TemperatureScale)
            }
            style={styles.picker}
            dropdownIconColor="#2196F3"
          >
            {allScales.map(scale => {
              const info = getScaleInfo(scale);
              return (
                <Picker.Item
                  key={scale}
                  label={`${info.name} (${info.symbol})`}
                  value={scale}
                />
              );
            })}
          </Picker>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Título */}
          <Card style={styles.titleCard}>
            <Text style={styles.title}>🌡️ {t('conversion.title')}</Text>
            <Text style={styles.subtitle}>{t('conversion.subtitle')}</Text>
          </Card>

          {/* Input */}
          <Card style={styles.inputCard}>
            <Text style={styles.inputLabel}>
              {t('conversion.valueToConvert')}:
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                placeholder={t('conversion.placeholder')}
                placeholderTextColor="#999"
              />
              <Text style={styles.inputUnit}>
                {getScaleInfo(fromScale).symbol}
              </Text>
            </View>

            {error && (
              <Text style={styles.errorText}>
                {t(`conversion.errors.${error}`, error)}
              </Text>
            )}

            <View style={styles.scalesContainer}>
              {renderScaleSelector(
                fromScale,
                setFromScale,
                t('conversion.from'),
              )}

              <TouchableOpacity
                style={styles.swapButton}
                onPress={swapScales}
                activeOpacity={0.7}
              >
                <Text style={styles.swapIcon}>🔄</Text>
                <Text style={styles.swapText}>{t('conversion.swap')}</Text>
              </TouchableOpacity>

              {renderScaleSelector(toScale, setToScale, t('conversion.to'))}
            </View>
          </Card>

          {/* Resultado */}
          <Card style={styles.resultCard}>
            <Text style={styles.resultLabel}>{t('conversion.result')}:</Text>

            <View style={styles.resultContainer}>
              <Text style={styles.resultValue}>{formatResult(decimals)}</Text>
              <Text style={styles.resultDetail}>
                {convertedValue.toLocaleString(undefined, {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                })}
              </Text>
            </View>

            {/* Decimales */}
            <View style={styles.decimalSelector}>
              <Text style={styles.decimalLabel}>
                {t('conversion.decimals')}:
              </Text>

              <View style={styles.decimalButtons}>
                {[0, 1, 2, 3, 4].map(num => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.decimalButton,
                      decimals === num && styles.decimalButtonActive,
                    ]}
                    onPress={() => setDecimals(num)}
                    activeOpacity={0.6}
                  >
                    <Text
                      style={[
                        styles.decimalButtonText,
                        decimals === num && styles.decimalButtonTextActive,
                      ]}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Card>

          {/* Botón reset */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.resetButton]}
              onPress={reset}
              activeOpacity={0.7}
            >
              <Text style={styles.resetButtonText}>
                🔄 {t('conversion.reset')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('home.footer.rights')}</Text>
            <Text style={styles.footerSubtext}>{t('home.footer.tool')}</Text>
            <Text style={styles.footerVersion}>v1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  titleCard: {
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  inputCard: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    backgroundColor: 'white',
    color: '#333',
  },
  inputError: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  inputUnit: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    minWidth: 40,
  },
  errorText: {
    color: '#F44336',
    fontSize: 14,
    marginTop: 4,
  },
  scalesContainer: {
    marginTop: 16,
  },
  scaleSelectorCard: {
    marginBottom: 12,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  scaleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  scaleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  scaleSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  scaleDescription: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: 'white',
  },
  swapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  swapIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  swapText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  resultCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  resultDetail: {
    fontSize: 14,
    color: '#666',
  },
  decimalSelector: {
    width: '100%',
  },
  decimalLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  decimalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  decimalButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  decimalButtonActive: {
    backgroundColor: '#2196F3',
  },
  decimalButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  decimalButtonTextActive: {
    color: 'white',
  },
  commonCard: {
    marginBottom: 16,
  },
  commonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  commonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  commonItem: {
    width: width > 400 ? '48%' : '100%',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  commonValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  commonDescription: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  resetButton: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  resetButtonText: {
    color: '#D32F2F',
    fontWeight: '600',
  },
  historyButton: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  historyButtonText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FFF3E0',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
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
});

export default ConvertionScreen;
