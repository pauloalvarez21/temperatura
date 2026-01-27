/**
 * @file obfuscate-bundle.js
 * @description Script para ofuscar el bundle de producción de React Native.
 * Este script genera el bundle de JS y luego lo ofusca para máxima seguridad.
 */

const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración de rutas
const BUNDLE_PATH = path.join(__dirname, '../android/app/src/main/assets/index.android.bundle');
const ASSETS_DIR = path.join(__dirname, '../android/app/src/main/assets');

async function run() {
  console.log('🚀 Iniciando proceso de ofuscación para Android...');

  // 1. Asegurar que existe el directorio de assets
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  // 2. Generar el bundle de React Native (esto junta todo tu código en un archivo)
  console.log('📦 Generando bundle de JavaScript...');
  try {
    execSync(
      `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output ${BUNDLE_PATH} --assets-dest android/app/src/main/res`,
      { stdio: 'inherit' }
    );
  } catch (error) {
    console.error('❌ Error al generar el bundle:', error);
    process.exit(1);
  }

  // 3. Leer el bundle generado
  console.log('🔍 Leyendo bundle original...');
  const bundleCode = fs.readFileSync(BUNDLE_PATH, 'utf8');

  // 4. Ofuscar el código
  console.log('🛡️  Ofuscando código (esto puede tardar un poco dependiendo del tamaño)...');
  const obfuscatedResult = JavaScriptObfuscator.obfuscate(bundleCode, {
    compact: true,
    controlFlowFlattening: true, // Hace el flujo de código ilegible
    controlFlowFlatteningThreshold: 0.75,
    numbersToExpressions: true,
    simplify: true,
    stringArray: true,
    stringArrayEncoding: ['base64'], // Encripta strings en base64
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
  });

  // 5. Sobrescribir el bundle con la versión ofuscada
  console.log('💾 Guardando bundle ofuscado...');
  fs.writeFileSync(BUNDLE_PATH, obfuscatedResult.getObfuscatedCode());

  console.log('✅ ¡Proceso completado con éxito! Ahora puedes compilar tu APK de release.');
}

run();
