import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle2, Receipt, ArrowRight, Home } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const orderId = "ANNAM-" + Math.floor(Math.random() * 1000000);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={ZoomIn.duration(600)} style={styles.successIcon}>
          <CheckCircle2 size={80} color={Colors.success} />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(300).duration(600)} style={styles.textSection}>
          <Text style={styles.title}>Payment Successful!</Text>
          <Text style={styles.subtitle}>Your order has been placed and sent to the kitchen.</Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(600).duration(600)} style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <Receipt size={24} color={Colors.secondary} />
            <Text style={styles.receiptTitle}>Order Receipt</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Order ID</Text>
            <Text style={styles.receiptValue}>{orderId}</Text>
          </View>
          
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Date</Text>
            <Text style={styles.receiptValue}>{new Date().toLocaleDateString()}</Text>
          </View>
          
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Table</Text>
            <Text style={styles.receiptValue}>Table 12</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.statusLabel}>Current Status</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Preparing your meal</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(900).duration(600)} style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.replace('/(tabs)/orders')}
          >
            <Text style={styles.primaryButtonText}>Track Order</Text>
            <ArrowRight size={20} color={Colors.white} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)/menu')}
          >
            <Home size={20} color={Colors.secondary} />
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  successIcon: {
    marginBottom: 24,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.secondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  receiptCard: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
    borderStyle: 'dashed',
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  receiptLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  receiptValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
  statusLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.success,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    gap: 12,
  },
  secondaryButtonText: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: '600',
  },
});
