import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { X, Zap, ZapOff } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QRScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    // In a real app, 'data' would be the table ID or menu URL
    // For now, any scan takes you to the menu
    router.replace('/(tabs)/menu');
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        enableTorch={torch}
      />
      
      <SafeAreaView style={styles.overlay}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <X color={Colors.white} size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Scan QR Code</Text>
          <TouchableOpacity onPress={() => setTorch(!torch)} style={styles.iconButton}>
            {torch ? <Zap color={Colors.white} size={24} /> : <ZapOff color={Colors.white} size={24} />}
          </TouchableOpacity>
        </View>

        <View style={styles.scannerContainer}>
          <View style={styles.scannerOutline} />
        </View>

        <View style={styles.bottomBar}>
          <Text style={styles.instruction}>
            Point your camera at the QR code on your table to view the menu
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  scannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerOutline: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  bottomBar: {
    padding: 40,
    alignItems: 'center',
  },
  instruction: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    borderRadius: 12,
  },
});
