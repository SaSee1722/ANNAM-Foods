import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Clock, CheckCircle2, ChevronRight } from 'lucide-react-native';

const MOCK_ORDERS = [
  {
    id: 'ANNAM-829104',
    date: 'Today, 2:30 PM',
    status: 'Preparing',
    total: 24.50,
    items: ['Butter Chicken', 'Garlic Naan'],
  },
  {
    id: 'ANNAM-718293',
    date: 'Yesterday, 8:15 PM',
    status: 'Completed',
    total: 15.99,
    items: ['Kung Pao Chicken'],
  }
];

export default function OrdersScreen() {
  const renderOrder = ({ item }: { item: typeof MOCK_ORDERS[0] }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, item.status === 'Completed' ? styles.statusCompleted : styles.statusPreparing]}>
          <Text style={[styles.statusText, item.status === 'Completed' ? styles.statusTextCompleted : styles.statusTextPreparing]}>
            {item.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderBody}>
        <Text style={styles.itemsLabel}>{item.items.join(', ')}</Text>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.viewDetails}>View Details</Text>
        <ChevronRight size={16} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Orders</Text>
      </View>
      
      <FlatList
        data={MOCK_ORDERS}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Clock size={60} color={Colors.border} />
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  header: {
    padding: 24,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.secondary,
  },
  listContent: {
    padding: 20,
    gap: 16,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
  },
  orderDate: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusPreparing: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  statusCompleted: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusTextPreparing: {
    color: Colors.primary,
  },
  statusTextCompleted: {
    color: Colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 16,
  },
  orderBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemsLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
    marginRight: 10,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.secondary,
  },
  orderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  emptyContainer: {
    paddingTop: 100,
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
