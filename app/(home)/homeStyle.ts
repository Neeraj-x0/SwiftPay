import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 4,
  },
  profileCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 10,
  },
  room: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    marginRight: 12,
  },
  signOutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  badge: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
   
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  inputContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    color: "#1e293b",
    marginBottom: 5,
  },
  inputError: {
    borderColor: "#ef4444",
    borderWidth: 1,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 13,
    marginTop: 6,
  },
  submitError: {
    textAlign: "center",
    marginTop: 10,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    color: "#1e293b",
    marginBottom: 16,
  },
  pickerWrapper: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
  },
  picker: {
    height: 55,
    color: "#1e293b",
    fontSize: 16,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#1e293b",
  },
  submitButton: {
    backgroundColor: "#6366f1",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  gridContainer: {
    marginBottom:-30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -2,
  },
  gridButton: {
    width: "23%", // Slightly less than 25% to account for margins
    margin: 2, // Reduced margin
    backgroundColor: "#f1f5f9",
    borderRadius: 6, // Slightly reduced for smaller buttons
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1.5, // Makes buttons slightly rectangular for better text fit
  },
  gridButtonSelected: {
    backgroundColor: "#6366f1",
  },
  gridButtonText: {
    fontSize: 11, // Reduced font size
    color: "#334155",
    textAlign: "center",
  },
  gridButtonTextSelected: {
    color: "#ffffff",
  },
});

export default styles;
