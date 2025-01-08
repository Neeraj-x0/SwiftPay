import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
  alert: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  buttonstampbox: {
    marginVertical: 4,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2196F3",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerText: {
    color: "white",
    marginHorizontal: 8,
    fontWeight: "300",
    fontSize: 12,
  },
  profileSection: {
    backgroundColor: "#2196F3",
    alignItems: "center",
    paddingBottom: 16,
  },
  profileImage: {
    width: 200,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  profileTitle: {
    color: "white",
    fontSize: 24,
    marginTop: 16,
  },
  tabContainer: {
    backgroundColor: "#2196F3",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    padding: 8,
    alignItems: "center",
    alignContent: "center",
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
  },
  tabText: {
    color: "#9dd8ff",
    fontWeight: "500",
    fontSize: 12,
  },
  selectedTabText: {
    color: "#ffffff",
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  qr: {
    backgroundColor: "#2196F3",
    width: 50,
    height: 50,
    marginTop: 8,
    position: "absolute",
    right: 0,
    top: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 4,
  },
  idBadge: {
    backgroundColor: "#673AB7",
    paddingVertical: 4,
    paddingHorizontal: 16,
    position: "absolute",
    right: -16,
    top: -16,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  idText: {
    color: "white",
    fontSize: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    fontWeight: "700",
  },
  detailRow: {
    flexDirection: "row",
  },
  detailLabel: {
    fontWeight: "400",
    color: "#9e9e9e",
  },
  detailValue: {
    marginLeft: 8,
  },
  trackButton: {
    backgroundColor: "#2196f3",
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
    width: "83%",
  },
  trackButtonText: {
    color: "white",
    fontWeight: "500",
  },

  linkText: {
    color: "#2196F3",
    fontWeight: "500",
  },
  stamp: {
    width: 64,
    height: 64,
    marginBottom: 16,
    opacity: 0.8,
    position: "absolute",
    right: -14,
    paddingLeft: 16,
    alignSelf: "flex-end",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
  },
  fabButton: {
    backgroundColor: "#2196F3",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  sortButton: {
    backgroundColor: "#2196F3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,

    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: 100,
    height: 56,
  },
  sortButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  popUpBG: {
    position: "absolute",
    elevation: 4,
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popUp: {
    backgroundColor: "white",
    width: width * 0.8, // 80% of screen width
    height: width * 0.75, // Ensure height is equal to width for square
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  qrCode: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
  popUpText: {
    fontSize: 24,
    fontWeight: "500",

    
  },
  popUpFooterText: {
    fontSize: 16,
    fontWeight: "400",  
  marginBottom: 24,
    
  },
  popupClose: {
    backgroundColor: "#44A5F2",
    paddingVertical: 16,
    position: "absolute",
    top: 0,
    right : 0,
    flex : 1,
    width: 65,
    height: 65,
    paddingHorizontal: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 3,
    zIndex: 2, // Ensures it stays above the popup content
  },
  popupCloseText: {
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
  },
  qrTouchable: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
