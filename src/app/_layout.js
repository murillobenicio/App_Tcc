import { router, Stack, useSegments } from "expo-router";
import { AppProvider } from "../hooks";
import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";

const StackLayout = () => {
  const { user } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";

    // if (!user?.autenticated && inAuthGroup) {
    //   router.replace("/");
    // } else {
    //   if (user?.autenticated) {
    //     router.replace("/(protected)");
    //   }
    // }
    if (user?.autenticated===true) {
      router.push("(protected)")
    } else {
      if (router.canGoBack()) {
        router.back()
        // router.back()
      } else {
        router.replace("/")
      }
    }
  }, [user]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:'false'}} />
      <Stack.Screen name="(protected)" options={{headerShown:'false'}} />
      <Stack.Screen name="about" options={{headerShown:'false'}} />
    </Stack>
  );
};

export default function Layout() {
  return (
    <AppProvider>
      <StackLayout />
    </AppProvider>
  );
}
