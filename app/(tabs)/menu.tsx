import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, ShoppingBag, Star, Clock, Plus, ScanLine } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { MENU_ITEMS, CATEGORIES } from '../../constants/Data';
import { useCart } from '../../context/CartContext';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

export default function MenuScreen() {
  const router = useRouter();
  const { addToCart, totalItems } = useCart();
  const [activeCategory, setActiveCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === '1' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => {
    const isActive = activeCategory === item.id;
    return (
      <TouchableOpacity 
        style={[styles.categoryItem, isActive && styles.activeCategoryItem]}
        onPress={() => setActiveCategory(item.id)}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <Text style={[styles.categoryText, isActive && styles.activeCategoryText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFoodItem = ({ item, index }: { item: typeof MENU_ITEMS[0], index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={styles.foodCard}
    >
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.ratingBadge}>
        <Star size={12} color="#FFD700" fill="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      
      <View style={styles.foodInfo}>
        <Text style={styles.foodName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.timeInfo}>
          <Clock size={14} color={Colors.textSecondary} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.foodPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <Plus size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Deliver to</Text>
          <Text style={styles.location}>Table 12, Annam FC</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.qrButton}
            onPress={() => router.push('/qr-scanner')}
          >
            <ScanLine size={24} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.textSecondary} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search for dishes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.foodRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.foodList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found</Text>
          </View>
        }
      />

      {totalItems > 0 && (
        <Animated.View 
          entering={FadeInRight.duration(400)}
          style={styles.cartFabContainer}
        >
          <TouchableOpacity 
            style={styles.cartFab}
            onPress={() => router.push('/cart')}
          >
            <View style={styles.cartFabContent}>
              <View style={styles.cartIconWrapper}>
                <ShoppingBag size={24} color={Colors.white} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              </View>
              <Text style={styles.viewCartText}>View Cart</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  location: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  qrButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  activeCategoryItem: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
  activeCategoryText: {
    color: Colors.white,
  },
  foodList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  foodRow: {
    justifyContent: 'space-between',
  },
  foodCard: {
    width: ITEM_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  foodImage: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    marginBottom: 12,
  },
  ratingBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondary,
  },
  foodInfo: {
    gap: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  foodPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartFabContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  cartFab: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cartFabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  cartIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -12,
    backgroundColor: Colors.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  viewCartText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  emptyContainer: {
    paddingTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
