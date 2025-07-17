import { SplashScreen, Stack } from "expo-router";
// import { useFonts } from "expo-font";
import { useEffect } from "react";
import "./global.css";
import useAuthStore from "@/store/authStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fetchAuthenticatedUser } = useAuthStore()
  // Temporarily disable font loading to test build
  // const [fontsLoaded, error] = useFonts({
  //   "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  //   "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
  //   "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
  //   "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  //   "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  // });

  useEffect(() => {
    // if (error) throw error;
    // if (fontsLoaded) SplashScreen.hideAsync();
    fetchAuthenticatedUser()
    SplashScreen.hideAsync();
  }, [fetchAuthenticatedUser]);

  // if (!fontsLoaded && !error) {
  //   return null;
  // }

  return <Stack screenOptions={{ headerShown: false }} />;
}
