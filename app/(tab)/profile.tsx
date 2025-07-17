import CustomButton from "@/components/customButton";
import { images } from "@/constants";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/authStore";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user, setIsAuthenticated, setUser, isLoading } = useAuthStore();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          setIsSigningOut(true);
          try {
            await signOut();
            setIsAuthenticated(false);
            setUser(null);
            router.replace("/signIn");
          } catch (error) {
            console.error("Sign out error:", error);
            Alert.alert("Error", "Failed to sign out");
          } finally {
            setIsSigningOut(false);
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 font-quicksand-medium">
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-5 pb-8">
          <View className="flex-between flex-row w-full mb-8">
            <View className="flex-start">
              <Text className="small-bold uppercase text-primary">Profile</Text>
              <Text className="paragraph-semibold text-dark-100">
                Manage your account
              </Text>
            </View>
          </View>

          {/* Profile Card */}
          <View className="bg-white rounded-2xl p-6 shadow-lg shadow-dark-100/10 border border-gray-100/20">
            {/* Avatar Section */}
            <View className="items-center mb-6">
              <View className="relative">
                <Image
                  source={{
                    uri:
                      user?.avatar ||
                      "https://via.placeholder.com/120x120/FF8C00/FFFFFF?text=" +
                        (user?.name?.charAt(0) || "U"),
                  }}
                  className="w-24 h-24 rounded-full"
                  defaultSource={{
                    uri:
                      "https://via.placeholder.com/120x120/FF8C00/FFFFFF?text=" +
                      (user?.name?.charAt(0) || "U"),
                  }}
                />
                <View className="absolute -bottom-1 -right-1 bg-primary w-8 h-8 rounded-full flex-center">
                  <Image
                    source={images.pencil}
                    className="w-4 h-4 tint-white"
                  />
                </View>
              </View>
              <Text className="text-xl font-quicksand-bold text-dark-100 mt-4">
                {user?.name || "Anonymous User"}
              </Text>
              <Text className="text-base font-quicksand-regular text-gray-500 mt-1">
                {user?.email || "No email provided"}
              </Text>
            </View>

            {/* Account Details */}
            <View className="space-y-4">
              <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                <Image
                  source={images.person}
                  className="w-5 h-5 tint-gray-500 mr-3"
                />
                <View className="flex-1">
                  <Text className="text-sm font-quicksand-medium text-gray-500">
                    Full Name
                  </Text>
                  <Text className="text-base font-quicksand-semibold text-dark-100 mt-1">
                    {user?.name || "Not provided"}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                <Image
                  source={images.envelope}
                  className="w-5 h-5 tint-gray-500 mr-3"
                />
                <View className="flex-1">
                  <Text className="text-sm font-quicksand-medium text-gray-500">
                    Email Address
                  </Text>
                  <Text className="text-base font-quicksand-semibold text-dark-100 mt-1">
                    {user?.email || "Not provided"}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                <Image
                  source={images.phone}
                  className="w-5 h-5 tint-gray-500 mr-3"
                />
                <View className="flex-1">
                  <Text className="text-sm font-quicksand-medium text-gray-500">
                    Phone Number
                  </Text>
                  <Text className="text-base font-quicksand-semibold text-dark-100 mt-1">
                    Not provided
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Sign Out Button */}
          <View className="mt-8">
            <CustomButton
              title={isSigningOut ? "Signing Out..." : "Sign Out"}
              style="bg-red-500"
              isLoading={isSigningOut}
              onPress={handleSignOut}
              leftIcon={
                <Image
                  source={images.logout}
                  className="w-5 h-5 tint-white mr-2"
                />
              }
            />
          </View>

          {/* App Info */}
          <View className="mt-8 items-center">
            <Text className="text-sm font-quicksand-regular text-gray-400">
              Food Delivery App v1.0.0
            </Text>
            <Text className="text-xs font-quicksand-regular text-gray-400 mt-1">
              Made with ❤️ using React Native & Appwrite
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
