import CustomButton from "@/components/customButton";
import CustomInput from "@/components/customInput";
import { signIn, signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/authStore";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function SignIn() {
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { fetchAuthenticatedUser, isAuthenticated } = useAuthStore();

  const handleSubmit = async () => {
    const { email, password } = form;
    if (!email || !password)
      return Alert.alert("Error", "Please enter your details");
    setIsSubmitting(true);
    try {
      console.log("1. isAuthenticated before:", isAuthenticated); //false
      // Clear any existing session first
      await signOut();
      console.log("2. Session cleared");
      await signIn({ email, password });
      console.log("3. Sign in successful");
      console.log("4. isAuthenticated before fetch:", isAuthenticated); //false
      // Refresh auth state after successful signin
      await fetchAuthenticatedUser();
      console.log("5. fetchAuthenticatedUser completed");
      console.log("6. isAuthenticated after fetch:", isAuthenticated);
      router.replace("/");
    } catch (error: any) {
      console.error("Sign in error:", error);
      Alert.alert("Error", error.message || "Failed to sign in");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white-100 rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="enter your email"
        label="email"
        value={form.email}
        keyboardType="email-address"
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
      />
      <CustomInput
        placeholder="enter your password"
        label="password"
        value={form.password}
        secureTextEntry={true}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
      />
      <CustomButton
        title="sign in"
        isLoading={isSubmiting}
        onPress={handleSubmit}
      />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don&apos;t have account?
        </Text>
        <Link href={"/signUp"}>Sign Up</Link>
      </View>
    </View>
  );
}
