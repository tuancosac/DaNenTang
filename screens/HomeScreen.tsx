import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {Video, ResizeMode} from 'expo-av';

export default function App() {
  const [search, setSearch] = useState('');
  const [activeStar, setActiveStar] = useState('Orion');

  const services = [
    {
      icon: '✦',
      title: 'Bản đồ sao',
      description: 'Khám phá các chòm sao và thiên thể.',
    },
    {
      icon: '◷',
      title: 'Đếm ngược',
      description: 'Theo dõi thời gian của Mặt Trời.',
    },
    {
      icon: '📅',
      title: 'Lịch thiên văn',
      description: 'Theo dõi các sự kiện thiên văn.',
    },
    {
      icon: '◉',
      title: 'Ảnh thiên văn',
      description: 'Khám phá hình ảnh vũ trụ mỗi ngày.',
    },
    {
      icon: '🧠',
      title: 'Kiến thức & Quiz',
      description: 'Học thiên văn và kiểm tra kiến thức.',
    },
    {
      icon: '☄',
      title: 'Dự báo thiên văn',
      description: 'Kiểm tra điều kiện quan sát bầu trời.',
    },
  ];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <View style={styles.logoContainer}>
          <Text style={styles.logoStar}>✦</Text>
          <Text style={styles.logo}>ASTROVERSE</Text>
        </View>

        <View style={styles.navigation}>
          <Pressable style={styles.navItem}>
            <Text style={styles.navText}>Khám phá</Text>
          </Pressable>

          <Pressable style={styles.navItem}>
            <Text style={styles.navText}>Kiến thức</Text>
          </Pressable>

          <Pressable style={styles.navItem}>
            <Text style={styles.navText}>Cộng đồng</Text>
          </Pressable>

        </View>

      </View>

      {/* ================= CONTENT ================= */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ================= HERO ================= */}
        <View style={styles.hero}>

        {/* VIDEO BACKGROUND */}
        <Video
            source={require('../assets/bg.mp4')}
            style={styles.heroVideo}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
        />

        {/* DARK OVERLAY */}
        <View style={styles.heroOverlay} />

        {/* HERO CONTENT */}
        <View style={styles.heroContent}>

            <Text style={styles.heroSmall}>
            ✦ WELCOME TO THE UNIVERSE ✦
            </Text>

            <Text style={styles.heroTitle}>
            KHÁM PHÁ
            <Text style={styles.heroHighlight}> THIÊN VĂN</Text>
            </Text>

            <Text style={styles.heroDescription}>
            Bầu trời đêm không chỉ để ngắm nhìn.
            {'\n'}
            Hãy bắt đầu hành trình khám phá những điều
            kỳ diệu ngoài không gian.
            </Text>

            <View style={styles.searchBox}>

            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Tìm kiếm chòm sao, hành tinh..."
                placeholderTextColor="#aaa"
                style={styles.searchInput}
            />

            <Pressable
                style={({pressed}) => [
                styles.searchButton,
                pressed && styles.pressed,
                ]}>
                <Text style={styles.searchButtonText}>⌕</Text>
            </Pressable>

            </View>

        </View>

        </View>


        {/* ================= SERVICES ================= */}
        <View style={styles.servicesSection}>

          <Text style={styles.sectionLabel}>
            DISCOVER
          </Text>

          <Text style={styles.sectionTitle}>
            Khám phá dịch vụ
          </Text>

          <Text style={styles.sectionDescription}>
            Mọi thứ bạn cần để khám phá và tìm hiểu vũ trụ.
          </Text>

          <View style={styles.serviceGrid}>

            {services.map((service, index) => (
              <Pressable
                key={index}
                style={({pressed}) => [
                  styles.serviceCard,
                  pressed && styles.serviceCardPressed,
                ]}>

                <View style={styles.serviceIcon}>
                  <Text style={styles.serviceIconText}>
                    {service.icon}
                  </Text>
                </View>

                <Text style={styles.serviceTitle}>
                  {service.title}
                </Text>

                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>

                <Text style={styles.serviceArrow}>
                  Khám phá →
                </Text>

              </Pressable>
            ))}

          </View>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },

  /* ================= HEADER ================= */

  header: {
    height: 70,
    paddingHorizontal: 35,
    backgroundColor: '#070b1d',
    borderBottomWidth: 1,
    borderBottomColor: '#18213d',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    zIndex: 10,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoStar: {
    fontSize: 22,
    color: '#8f9cff',
    marginRight: 8,
  },

  logo: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 2,
  },

  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 100,
  },

  navItem: {
    paddingVertical: 10,
  },

  navText: {
    color: '#aeb7d0',
    fontSize: 16,
  },

  /* ================= HERO ================= */

    hero: {
    height: 820,
    position: 'relative',
    overflow: 'hidden',
    },

    heroVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    },

    heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(3, 5, 18, 0.58)',
    },

    heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    },

    heroSmall: {
    color: '#aab4ff',
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 20,
    },

    heroTitle: {
    color: '#ffffff',
    fontSize: 56,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 62,
    letterSpacing: 4,
    },

    heroHighlight: {
    color: '#8995ff',
    },

    heroDescription: {
    color: '#e0e3ef',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 25,
    marginTop: 20,
    },

    searchBox: {
    width: '80%',
    maxWidth: 520,
    height: 50,
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 16, 37, 0.9)',
    borderWidth: 1,
    borderColor: '#5967d8',
    borderRadius: 25,
    },

    searchInput: {
    flex: 1,
    paddingHorizontal: 20,
    color: '#ffffff',
    fontSize: 14,
    },

    searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5865d9',
    },

    searchButtonText: {
    color: '#ffffff',
    fontSize: 25,
    },

  /* ================= SERVICES ================= */

  skySection: {
    minHeight: 650,
    paddingHorizontal: 40,
    paddingVertical: 80,

    backgroundColor: '#070b1d',
  },

  sectionLabel: {
    color: '#6977db',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    textAlign: 'center',
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
  },

  sectionDescription: {
    color: '#7f89a5',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },

  servicesSection: {
    paddingHorizontal: 40,
    paddingVertical: 80,
    backgroundColor: '#050816',
  },

  serviceGrid: {
    marginTop: 40,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },

  serviceCard: {
    width: 250,
    minHeight: 210,

    padding: 25,

    backgroundColor: '#0a1025',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1b2747',
  },

  serviceCardPressed: {
    backgroundColor: '#111a38',
    borderColor: '#6572dc',
    transform: [{translateY: -5}],
  },

  serviceIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#151d3d',
    marginBottom: 20,
  },

  serviceIconText: {
    fontSize: 20,
    color: '#8995ff',
  },

  serviceTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },

  serviceDescription: {
    color: '#7f89a5',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },

  serviceArrow: {
    color: '#8995ff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 20,
  },
});