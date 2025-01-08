import React from "react";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Page() {
  const { user } = useUser();
  const clerk = useClerk();

  // If user is signed in, redirect to home
  if (user) {

    return <Redirect href={"./(home)"} />;
  }

  return (
    <View style={styles.container}>
      <SignedIn>
        <Redirect href={"./(home)"} />
      </SignedIn>

      <SignedOut>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="door-open" size={64} color="#6366f1" />
            <Text style={styles.title}>XeroBox</Text>
          </View>

          <Text style={styles.tagline}>Freedom at your fingertips! 🚪✨</Text>
          <Text style={styles.description}>
            Skip the endless WhatsApp approvals. Get your hostel pass instantly
            with our automated system. No more waiting on parents or wardens.
          </Text>

          <Link href="./(auth)" asChild>
            <TouchableOpacity style={styles.signInButton} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 12,
  },
  tagline: {
    fontSize: 18,
    color: "#6366f1",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  signInButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  welcomeContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    fontSize: 20,
    color: "#1e293b",
    marginTop: 16,
    textAlign: "center",
  },
});
