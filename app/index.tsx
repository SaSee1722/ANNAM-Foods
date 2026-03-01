import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { ChevronRight, ChevronLeft, Plus, Leaf, Clock, MapPin, Star, ShieldCheck, Soup, Coffee } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const FOOD_ITEMS = [
  {
    id: 1,
    name: 'Exotic Fruit Blast',
    price: '₹120',
    description: 'Fresh tropical fruits sourced directly from local organic gardens. A healthy, refreshing start.',
    image: require('../assets/images/fruit_salad.png'),
  },
  {
    id: 2,
    name: 'Banana Leaf Platter',
    price: '₹250',
    description: 'Traditional South Indian lunch served on a fresh, sterilized banana leaf for authentic taste.',
    image: require('../assets/images/starter_main.png'),
  },
  {
    id: 3,
    name: 'Signature Lime Juice',
    price: '₹45',
    description: 'Pure citrus energy with a touch of honey and mint, prepared fresh on order.',
    image: require('../assets/images/juice_main.png'),
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextItem = () => {
    setActiveIndex((prev) => (prev + 1) % FOOD_ITEMS.length);
  };

  const prevItem = () => {
    setActiveIndex((prev) => (prev - 1 + FOOD_ITEMS.length) % FOOD_ITEMS.length);
  };

  const currentItem = FOOD_ITEMS[activeIndex];

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#FFFFFF', '#F1F8E9', '#E8F5E9']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Simplified Navbar */}
      <View style={styles.navbar}>
        <View style={styles.logoRow}>
          <Leaf size={32} color={Colors.primary} fill={Colors.primary} />
          <Text style={styles.logoText}>Annam FC</Text>
        </View>
        <View style={styles.navLinks}>
          <TouchableOpacity 
            style={styles.loginTextBtn} 
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.joinBtn} 
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text style={styles.joinBtnText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.textContent}>
            <Animated.View entering={FadeInDown.duration(800)}>
              <Text style={styles.heroTitle}>
                Taste the Freshness of{'\n'}
                <Text style={styles.highlightText}>Banana Leaf</Text>
              </Text>
              <Text style={styles.heroDesc}>
                At Annam, we believe food is more than just a meal—it's a tradition. We bring the ancient art of serving on banana leaves to your modern table, ensuring health and flavor in every bite.
              </Text>

              <View style={styles.infoPills}>
                <View style={styles.pill}>
                  <Clock size={16} color={Colors.primary} />
                  <Text style={styles.pillText}>Fast Delivery</Text>
                </View>
                <View style={styles.pill}>
                  <Leaf size={16} color={Colors.primary} />
                  <Text style={styles.pillText}>100% Organic</Text>
                </View>
              </View>

              <View style={styles.priceSection}>
                <Text style={styles.priceLabel}>Starting From</Text>
                <Text style={styles.priceVal}>{currentItem.price}</Text>
              </View>

              <TouchableOpacity 
                style={styles.orderBtn}
                onPress={() => router.push('/(tabs)/menu')}
              >
                <Text style={styles.orderBtnText}>Order Now</Text>
                <View style={styles.plusWrap}>
                  <Plus size={20} color={Colors.white} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Carousel with Banana Leaf Plate Backdrop */}
          <View style={styles.carouselSection}>
            <View style={styles.plateDisplay}>
              {/* Background Plate with Banana Leaf */}
              <Image 
                source={require('../assets/images/banana_leaf_plate.png')} 
                style={styles.plateBackdrop}
                resizeMode="contain"
              />
              
              {/* Food Item Layered Top */}
              <Animated.View 
                key={activeIndex} 
                entering={FadeInUp.duration(600)}
                style={styles.foodOverlay}
              >
                <Image 
                  source={currentItem.image} 
                  style={styles.foodImg} 
                  resizeMode="contain" 
                />
              </Animated.View>

              {/* Navigation Arrows */}
              <TouchableOpacity style={[styles.arrowBtn, styles.arrowLeft]} onPress={prevItem}>
                <ChevronLeft size={24} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.arrowBtn, styles.arrowRight]} onPress={nextItem}>
                <ChevronRight size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <Text style={styles.foodNameDisplay}>{currentItem.name}</Text>
          </View>
        </View>

        {/* Feature Blocks */}
        <View style={styles.infoBlocks}>
          <View style={styles.block}>
            <View style={styles.iconCircle}>
              <ShieldCheck size={32} color={Colors.primary} />
            </View>
            <Text style={styles.blockTitle}>Health First</Text>
            <Text style={styles.blockDesc}>Our kitchen follows ancient Ayurvedic standards for cleanliness and nutrition-preserving preparation.</Text>
          </View>
          
          <View style={styles.block}>
            <View style={styles.iconCircle}>
              <Soup size={32} color={Colors.primary} />
            </View>
            <Text style={styles.blockTitle}>Authentic Spices</Text>
            <Text style={styles.blockDesc}>Every spice used is hand-picked, slow-roasted, and ground daily to maintain the oils and richness.</Text>
          </View>

          <View style={styles.block}>
            <View style={styles.iconCircle}>
              <Coffee size={32} color={Colors.primary} />
            </View>
            <Text style={styles.blockTitle}>Our Mission</Text>
            <Text style={styles.blockDesc}>To preserve the eco-friendly tradition of serving on leaves while providing premium dining quality.</Text>
          </View>
        </View>

        {/* Detailed Information Sections */}
        <View style={styles.detailSection}>
           <View style={styles.detailCard}>
              <Text style={styles.detailTag}>THE JOURNEY</Text>
              <Text style={styles.detailTitle}>Garden to Plate</Text>
              <Text style={styles.detailText}>
                We partner with local farmers who cultivate crops without chemical pesticides. Your food travels less and tastes better, supporting the local ecosystem at every step.
              </Text>
           </View>

           <View style={styles.detailCard}>
              <Text style={styles.detailTag}>THE PROCESS</Text>
              <Text style={styles.detailTitle}>Traditional Cooking</Text>
              <Text style={styles.detailText}>
                We use clay pots and wood-fire techniques where possible to ensure that the minerals stay intact. It takes longer, but the flavor is incomparable to modern fast-food.
              </Text>
           </View>

           <View style={styles.detailCard}>
              <Text style={styles.detailTag}>THE PEOPLE</Text>
              <Text style={styles.detailTitle}>Community Focus</Text>
              <Text style={styles.detailText}>
                Annam is more than a food court; it's a home. A percentage of every meal goes toward supporting local culinary students and traditional artisans.
              </Text>
           </View>
        </View>

        {/* Footer Area */}
        <View style={styles.footer}>
          <View style={styles.footerBrand}>
             <Leaf size={24} color={Colors.white} fill={Colors.white} />
             <Text style={styles.footerBrandText}>Annam FC</Text>
          </View>
          <View style={styles.footerBottom}>
            <Text style={styles.copyright}>© 2026 Annam. All rights reserved.</Text>
            <View style={styles.location}>
               <MapPin size={14} color="#A5D6A7" />
               <Text style={styles.locationText}>Chennai, Tamil Nadu</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width > 900 ? 80 : 24,
    paddingVertical: 35,
    zIndex: 100,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primaryDark,
    letterSpacing: -0.5,
  },
  sideQueue: {
    flexDirection: 'row',
    position: 'absolute',
    right: -100,
    top: '30%',
    gap: 20,
    flex: 1,
    paddingVertical: 15,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  loginTextBtn: {
    padding: 10,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  joinBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 50,
    elevation: 4,
  },
  joinBtnText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    flexDirection: width > 900 ? 'row' : 'column',
    alignItems: 'center',
    paddingHorizontal: width > 900 ? 80 : 24,
    paddingTop: 40,
    paddingBottom: 60,
    gap: 60,
  },
  textContent: {
    flex: 1,
    maxWidth: 600,
  },
  heroTitle: {
    fontSize: width > 600 ? 72 : 48,
    fontWeight: '900',
    color: Colors.text,
    lineHeight: width > 600 ? 82 : 55,
  },
  highlightText: {
    color: Colors.primary,
  },
  heroDesc: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginTop: 25,
    lineHeight: 30,
    fontWeight: '500',
  },
  infoPills: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 25,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  priceSection: {
    marginTop: 40,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceVal: {
    fontSize: 42,
    fontWeight: '900',
    color: Colors.primaryDark,
    marginTop: 5,
  },
  orderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    marginTop: 45,
    paddingLeft: 35,
    paddingRight: 10,
    paddingVertical: 10,
    borderRadius: 60,
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  orderBtnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
    marginRight: 25,
  },
  plusWrap: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselSection: {
    flex: 1,
    alignItems: 'center',
  },
  plateDisplay: {
    width: width > 600 ? 550 : 350,
    height: width > 600 ? 550 : 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plateBackdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  foodOverlay: {
    width: '75%',
    height: '75%',
    zIndex: 5,
  },
  foodImg: {
    width: '100%',
    height: '100%',
  },
  foodNameDisplay: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  arrowBtn: {
    position: 'absolute',
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    zIndex: 10,
  },
  arrowLeft: {
    left: 0,
  },
  arrowRight: {
    right: 0,
  },
  infoBlocks: {
    paddingHorizontal: width > 900 ? 80 : 24,
    paddingVertical: 80,
    flexDirection: width > 800 ? 'row' : 'column',
    gap: 40,
    backgroundColor: '#FFFFFF',
  },
  block: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F1F8E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  blockTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 10,
  },
  blockDesc: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  detailSection: {
    paddingHorizontal: width > 900 ? 80 : 24,
    paddingVertical: 100,
    backgroundColor: '#F9FBF9',
    gap: 40,
    flexDirection: width > 800 ? 'row' : 'column',
  },
  detailCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 35,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  detailTag: {
    fontSize: 12,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  footer: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: width > 900 ? 80 : 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  footerBrandText: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.white,
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 30,
  },
  copyright: {
    color: '#A5D6A7',
    fontSize: 14,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: '#A5D6A7',
    fontSize: 14,
  },
});
