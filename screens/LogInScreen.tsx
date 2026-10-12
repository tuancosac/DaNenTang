import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import UniverseBackground from "../components/background";
import { loginApi } from "../services/api";
import { styles } from "../styles/form";

interface LogInScreenProps {
  navigation?: {
    navigate: (screen: "Login" | "Register" | "Home") => void;
  };
}

export default function LogInScreen({ navigation }: LogInScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
      return;
    }

    Alert.alert(title, message);
  };

  const handleLogin = async () => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      showMessage("Thông báo", "Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setLoading(true);
    try {
      const result = await loginApi(normalizedEmail, password);
      showMessage("Đăng nhập thành công", `Xin chào ${result.user.username}!`);
      navigation?.navigate("Home");
    } catch (error: unknown) {
      const responseMessage = axios.isAxiosError<{
        message?: string | string[];
      }>(error)
        ? error.response?.data?.message
        : undefined;
      const message = Array.isArray(responseMessage)
        ? responseMessage.join("\n")
        : responseMessage ||
          (axios.isAxiosError(error) && error.response
            ? "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập."
            : "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng.");
      showMessage("Đăng nhập thất bại", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UniverseBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Đăng nhập</Text>
            <Text style={styles.subtitle}>Khám phá vũ trụ cùng bạn</Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                placeholderTextColor="#6b7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#6b7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Đăng nhập</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Chưa có tài khoản? </Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate("Register")}
              >
                <Text style={styles.loginLink}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </UniverseBackground>
  );
}
