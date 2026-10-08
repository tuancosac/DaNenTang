import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios, { AxiosError } from 'axios';
import { styles } from '../styles/form';
import UniverseBackground from '../components/background';

interface SignUpScreenProps {
  navigation?: any;
}
const API_URL = 'http://192.168.1.51:3667/accounts/register';

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    console.log('>>> CLICK BUTTON REGISTER SUCCESS!');
    // 1. Kiểm tra rỗng
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      if (Platform.OS === 'web') window.alert('Vui lòng điền đủ thông tin');
      else Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    // 2. Kiểm tra mật khẩu khớp nhau
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    // 3. Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      await axios.post(API_URL, {
        username: username.trim(),
        email: email.trim(),
        password: password,
      });

      Alert.alert('Thành công', 'Đăng ký tài khoản thành công!', [
        {
          text: 'Đăng nhập ngay',
          onPress: () => navigation?.navigate?.('Login'),
        },
      ]);

      // Reset ô nhập liệu
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      const err = error as AxiosError<{ message: string | string[] }>;
      const errorMessage =
        err.response?.data?.message ||
        'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.';

      Alert.alert(
        'Đăng ký thất bại',
        Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <UniverseBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* Tiêu đề */}
            <Text style={styles.title}>Đăng Ký</Text>
            <Text style={styles.subtitle}>Khám phá vũ trụ cùng bạn.</Text>

            {/* Tên người dùng */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Tên người dùng / Họ tên</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập họ và tên"
                placeholderTextColor="#6b7280"
                autoCapitalize="none"
                value={username} 
                onChangeText={setUsername} 
              />
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập email"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email} 
                onChangeText={setEmail} 
              />
            </View>

            {/* Mật khẩu */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#6b7280"
                secureTextEntry
                value={password} 
                onChangeText={setPassword} 
              />
            </View>

            {/* Xác nhận mật khẩu */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Xác nhận mật khẩu</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#6b7280"
                secureTextEntry
                value={confirmPassword} 
                onChangeText={setConfirmPassword} 
              />
            </View>

            {/* Nút Đăng ký */}
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={handleSignUp}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Đăng Ký</Text>
              )}
            </TouchableOpacity>

            {/* Link đăng nhập */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation?.navigate?.('Login')}>
                <Text style={styles.loginLink}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </UniverseBackground>
  );
};

export default SignUpScreen;