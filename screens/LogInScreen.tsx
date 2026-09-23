import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import UniverseBackground from '../components/background';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(
        'Thông báo',
        'Vui lòng nhập đầy đủ email và mật khẩu.'
      );
      return;
    }

    Alert.alert(
      'Đăng nhập',
      'Chào mừng bạn trở lại!'
    );
  };

  const handleRegister = () => {
    Alert.alert(
      'Đăng ký',
      'Chuyển đến màn hình đăng ký.'
    );
  };

  return (
    <UniverseBackground>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.formContainer}>

          {/* Tiêu đề */}
          <Text style={styles.title}>
            Đăng nhập
          </Text>

          <Text style={styles.subtitle}>
            Khám phá vũ trụ cùng bạn
          </Text>

          {/* Email */}
          <View style={styles.inputWrapper}>

            <Text style={styles.label}>
              Email
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nhập email của bạn"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

          </View>

          {/* Mật khẩu */}
          <View style={styles.inputWrapper}>

            <Text style={styles.label}>
              Mật khẩu
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#6b7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

          </View>

          {/* Nút đăng nhập */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              Đăng nhập
            </Text>
          </Pressable>

          {/* Đăng ký */}
          <View style={styles.loginRow}>

            <Text style={styles.loginText}>
              Chưa có tài khoản?{' '}
            </Text>

            <Pressable onPress={handleRegister}>
              <Text style={styles.loginLink}>
                Đăng ký
              </Text>
            </Pressable>

          </View>

        </View>

      </ScrollView>

    </UniverseBackground>
  );
}

const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  formContainer: {
    backgroundColor: 'rgba(15, 15, 30, 0.75)',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
  },

  inputWrapper: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: '#d1d5db',
    marginBottom: 6,
    fontWeight: '500',
  },

  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },

  button: {
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },

  loginText: {
    color: '#9ca3af',
    fontSize: 14,
  },

  loginLink: {
    color: '#818cf8',
    fontSize: 14,
    fontWeight: '600',
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

});