import CustomButton from "@/components/customButton";
import CustomInput from "@/components/customInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password)
      return Alert.alert(
        "Error",
        "Please enter valid email address & password."
      );
    setIsSubmitting(true);

    try {
      await createUser({ name, email, password });
      // Successful signup, redirect to sign in
      router.replace("/signIn");
    } catch (error: any) {
      console.error("Signup error:", error);
      Alert.alert("Error", error.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full name"
      />
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />

      <CustomButton
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={handleSubmit}
      />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/signIn" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
}
