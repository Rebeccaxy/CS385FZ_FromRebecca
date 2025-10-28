import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        const success = await login(username, password);
        if (success) {
            Alert.alert("Success", "Login successful!", [
                { text: "OK", onPress: () => router.back() },
            ]);
        } else {
            Alert.alert("Error", "Invalid username or password");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
                {t("login")}
            </Text>

            <TextInput
                placeholder={t("username")}
                value={username}
                onChangeText={setUsername}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 }}
            />
            <TextInput
                placeholder={t("password")}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 }}
            />
            <Button title={t("login_button")} onPress={handleLogin} />

            <Text
                onPress={() => router.push("/register")}
                style={{ marginTop: 15, color: "blue", textAlign: "center" }}
            >
                {t("no_account")}
            </Text>
        </View>
    );
}
