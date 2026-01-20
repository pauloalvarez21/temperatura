import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  //Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

import Card from '../components/Card';
import useTemperatureConverter from '../hooks/useTemperatureConverter';
import { TemperatureScale } from '../utils/temperatureConverter';

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

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
          <View style={styles.scaleIconContainer}>
            <Text style={styles.scaleIcon}>🌡️</Text>
          </View>
          <View style={styles.scaleTextContainer}>
            <Text style={styles.scaleName}>{scaleInfo.name}</Text>
            <Text style={styles.scaleSymbol}>{scaleInfo.symbol}</Text>
          </View>
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
          {/* Header con título */}

          <Card style={styles.heroCard}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>🌡️</Text>
              </View>
              <Text style={styles.appName}>{t('conversion.title')}</Text>
              <Text style={styles.appTagline}>{t('conversion.subtitle')}</Text>
            </View>
          </Card>

          {/* Card principal de conversión */}
          <Card style={styles.mainCard}>
            {/* Input de temperatura */}
            <View style={styles.inputSection}>
              <Text style={styles.sectionLabel}>
                {t('conversion.valueToConvert')}:
              </Text>

              <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, error && styles.inputError]}
                    value={inputValue}
                    onChangeText={setInputValue}
                    keyboardType="numeric"
                    placeholder={t('conversion.placeholder')}
                    placeholderTextColor="#999"
                  />
                  <View style={styles.inputUnitContainer}>
                    <Text style={styles.inputUnit}>
                      {getScaleInfo(fromScale).symbol}
                    </Text>
                  </View>
                </View>

                {error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>
                      {t(`conversion.errors.${error}`, error)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Selectores de escala con botón de intercambio */}
            <View style={styles.scalesSection}>
              <View style={styles.scalesGrid}>
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
                  <View style={styles.swapIconContainer}>
                    <Text style={styles.swapIcon}>🔄</Text>
                  </View>
                  <Text style={styles.swapText}>{t('conversion.swap')}</Text>
                </TouchableOpacity>

                {renderScaleSelector(toScale, setToScale, t('conversion.to'))}
              </View>
            </View>

            {/* Resultado */}
            <View style={styles.resultSection}>
              <Text style={styles.resultLabel}>{t('conversion.result')}:</Text>

              <Card style={styles.resultCard}>
                <View style={styles.resultValueContainer}>
                  <Text style={styles.resultValue}>
                    {formatResult(decimals)}
                  </Text>
                  <Text style={styles.resultUnit}>
                    {getScaleInfo(toScale).symbol}
                  </Text>
                </View>

                <View style={styles.resultDetailContainer}>
                  <Text style={styles.resultDetail}>
                    {convertedValue.toLocaleString(undefined, {
                      minimumFractionDigits: decimals,
                      maximumFractionDigits: decimals,
                    })}{' '}
                    {getScaleInfo(toScale).symbol}
                  </Text>
                </View>
              </Card>

              {/* Selector de decimales */}
              <View style={styles.decimalSection}>
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
            </View>
          </Card>

          {/* Botones de acción */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.resetButton]}
              onPress={reset}
              activeOpacity={0.7}
            >
              <Text style={styles.resetButtonIcon}>🔄</Text>
              <Text style={styles.resetButtonText}>
                {t('conversion.reset')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('home.footer.rights')}</Text>
            <Text style={styles.footerSubtext}>{t('home.footer.tool')}</Text>
            <Text style={styles.footerVersion}>v1.0.0</Text>
          </View>

          <View style={styles.bottomSpacer} />
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              networkExtras: {
                collapsible: 'bottom',
              },
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logo: {
    fontSize: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  appTagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  mainCard: {
    marginBottom: 25,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputSection: {
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  inputWrapper: {
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 24,
    color: '#333',
    fontWeight: '600',
  },
  inputError: {
    color: '#F44336',
  },
  inputUnitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F0F7FF',
    borderLeftWidth: 2,
    borderLeftColor: '#E0E0E0',
  },
  inputUnit: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    minWidth: 50,
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  errorIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  errorText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: '500',
  },
  scalesSection: {
    marginBottom: 25,
  },
  scalesGrid: {
    position: 'relative',
  },
  scaleSelectorCard: {
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E8F0FE',
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scaleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scaleIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  scaleIcon: {
    fontSize: 24,
    color: '#2196F3',
  },
  scaleTextContainer: {
    flex: 1,
  },
  scaleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  scaleSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  scaleDescription: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 15,
    lineHeight: 18,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  picker: {
    height: 50,
    backgroundColor: 'white',
  },
  swapButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 10,
    alignItems: 'center',
  },
  swapIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  swapIcon: {
    fontSize: 28,
    color: 'white',
  },
  swapText: {
    color: '#2196F3',
    fontWeight: '600',
    fontSize: 12,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  resultSection: {
    marginTop: 10,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  resultCard: {
    backgroundColor: '#F0F7FF',
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  resultValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 10,
  },
  resultUnit: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  resultDetailContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
  },
  resultDetail: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  decimalSection: {
    alignItems: 'center',
  },
  decimalLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    fontWeight: '500',
  },
  decimalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  decimalButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  decimalButtonActive: {
    backgroundColor: '#2196F3',
    elevation: 3,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  decimalButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  decimalButtonTextActive: {
    color: 'white',
  },
  actionButtons: {
    marginBottom: 25,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resetButton: {
    backgroundColor: '#FFEBEE',
    borderWidth: 2,
    borderColor: '#FFCDD2',
  },
  resetButtonIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  resetButtonText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  footerVersion: {
    fontSize: 11,
    color: '#BBB',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 20,
  },
  heroCard: {
    marginBottom: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default ConvertionScreen;
