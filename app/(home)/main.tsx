//Leave Card
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Dimensions,
} from "react-native";
import parseDate from "./Function";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useGlobalSearchParams } from "expo-router";
import styles from "./LeaveStyle";

import { SignedIn, SignedOut } from "@clerk/clerk-react";

import { Redirect } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const idNo = Math.floor(10000 + Math.random() * 90000);

interface LeaveReason {
  label: string;
  value: string;
}

interface Authority {
  label: string;
  value: string;
}

const LEAVE_REASONS: LeaveReason[] = [
  { label: "Select your reason", value: "" },
  { label: "Visiting Parents", value: "VISITING_PARENTS" },
  { label: "Family Function", value: "FAMILY_FUNCTION" },
  { label: "Emergency", value: "EMERGENCY" },
  { label: "Sick", value: "SICK" },
  { label: "Competitive Exam", value: "COMPETITIVE_EXAM" },
  { label: "Project", value: "PROJECT" },
  { label: "Seminar", value: "SEMINAR" },
  { label: "Event", value: "EVENT" },
  { label: "Educational Trip", value: "EDUCATIONAL_TRIP" },
  { label: "Travelling", value: "TRAVELLING" },
  { label: "Sport Event", value: "SPORT_EVENT" },
  { label: "Local Guardian", value: "LOCAL_GUARDIAN" },
  { label: "Other", value: "OTHER" },
];

const AUTHORITIES: Authority[] = [
  { label: "Select authority", value: "" },
  { label: "Ram Veer", value: "RAM_VEER" },
  { label: "Shivnath Singh", value: "SHIVNATH_SINGH" },
  { label: "Anoop", value: "ANOOP" },
  { label: "Dinesh Pandey", value: "DINESH_PANDEY" },
];

const LeaveManagementScreen = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const route = useGlobalSearchParams();
  const navigation = useNavigation();

  const [title, setTitle] = useState("My Leaves");
  const [popUp, setPopUp] = useState(false);
  const [popUpText, setPopUpText] = useState("");

  const [selectedTab, setSelectedTab] = useState(0); // Default to the "Approved" tab
  const scrollViewRef = useRef<ScrollView>(null);
  const { name, reason, description, actionTakenBy, room, dateFrom, dateTo } =
    route as unknown as {
      name: string;
      reason: string;
      description: string;
      room: number;
      actionTakenBy: string;
      dateFrom: string;
      dateTo: string;
    };

  const tabs = !isEnabled
    ? ["Pending", "Approved", "Rej/Can"]
    : ["Pending", "Approved", "Expired", "Completed", "Rej/Can"];
  const texts = !isEnabled
    ? [
        "No Pending Requests, Click + to add new Request",
        "No Approved Requests",
        "No Rejected/Cancelled Requests",
      ]
    : [
        "No Pending Requests, Click + to add new Request",
        "No Approved Requests",
        "No Expired Requests",
        "No Completed Requests",
        "No Rejected/Cancelled Requests",
      ];

  useEffect(() => {
    renderTabContent(selectedTab);
  }, [isEnabled]);

  const handleSwitch = () => {
    setIsEnabled((prev) => !prev);
    setTitle(isEnabled ? "My Day Outs" : "My Leaves");
    renderTabContent(selectedTab);
  };

  // Handle tab change and scroll to the appropriate tab
  const handleTabPress = useCallback((index: number) => {
    setSelectedTab(index);
    scrollViewRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
  }, []);

  const togglePopUp = () => {
    if (!popUp) {
      // Qr Generated at 03:52 on 03-Jan
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
      // Array of month names
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
  
      const monthName = monthNames[date.getMonth()]; // Get the month's name
      setPopUpText(
        `Qr Generated at ${formattedHours}:${formattedMinutes} on ${date.getDate()}-${monthName}`
      );
    }
    setPopUp(!popUp);
  };
  

  // Memoize renderTabContent for performance improvement
  const renderTabContent = useCallback(
    (index: number) => {
      if (index !== 1 || !isEnabled) {
        return (
          <View
            key={index}
            style={[
              styles.container,
              {
                width: SCREEN_WIDTH,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              },
            ]}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 11,
                paddingTop: SCREEN_WIDTH / 2,
              }}
            >
              {texts[index]}
            </Text>
          </View>
        );
      }

      return (
        <View key={index} style={[styles.container, { width: SCREEN_WIDTH }]}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{name}</Text>
              <View style={styles.idBadge}>
                <Text style={styles.idText}>ID: {idNo.toString()}</Text>
              </View>
              <TouchableOpacity
                onPress={togglePopUp}
                style={styles.qrTouchable}
              >
                <View style={styles.qr}>
                  <MaterialIcons name="qr-code-2" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="business" size={24} color="#757575" />
              <Text style={styles.infoText}>Galgotias University - {room}</Text>
            </View>

            <View style={styles.infoRow}>
              <Image
                source={require("../../assets/images/alert.png")}
                style={styles.alert}
              />
              <Text style={styles.infoText}>
                {
                  LEAVE_REASONS.find(
                    (leaveReason) => leaveReason.value === reason
                  )?.label
                }
              </Text>
            </View>

            <LeaveDetail label="Description:" value={description || ""} />
            <LeaveDetail
              label="Duration:"
              value={
                parseDate(dateFrom, dateTo).noOfDays +
                (parseDate(dateFrom, dateTo).noOfDays > 1 ? " Days" : " Day") +
                " (" +
                parseDate(dateFrom, dateTo).formatted +
                ")"
              }
            />
            <LeaveDetail
              label="Parent's Permission:"
              value="APPROVED"
              valueStyle={{ color: "#009900" }}
            />
            <LeaveDetail
              label="Action taken by:"
              value={
                AUTHORITIES.find(
                  (authority) => authority.value === actionTakenBy
                )?.label +
                  " On " +
                  parseDate(dateFrom).monthAndDate || "N/A"
              }
            />
            <LeaveDetail label="Created At:" value={dateFrom} />
            <View style={styles.buttonstampbox}>
              <TouchableOpacity style={styles.trackButton}>
                <Text style={styles.trackButtonText}>
                  Track WhatsApp Notification
                </Text>
              </TouchableOpacity>
              <Image
                source={require("../../assets/images/approved-stamp.png")}
                style={styles.stamp}
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.linkText}>Need Extension?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.linkText}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [dateFrom, dateTo, name, reason, room, actionTakenBy, description, texts]
  );

  return (
    <>
      <SignedOut>
        <Redirect href={"../"} />;
      </SignedOut>
      <SignedIn>
        <View style={styles.container}>
          {/* Header */}
          {/* Pop-up Component */}
          {popUp && (
            <Modal
              visible={popUp}
              transparent={true}
              animationType="none"
              onRequestClose={togglePopUp}
            >
              <View style={styles.popUpBG}>
                <View style={styles.popUp}>
                  <TouchableOpacity
                    onPress={togglePopUp}
                    style={styles.popupClose}
                  >
                    <Text style={styles.popupCloseText}>X</Text>
                  </TouchableOpacity>

                  <Text style={styles.popUpText}>Entry</Text>
                  <Image
                    source={require("../../assets/images/qr.png")}
                    style={styles.qrCode}
                  />
                  <Text style={styles.popUpFooterText}>{popUpText}</Text>
                </View>
              </View>
            </Modal>
          )}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <MaterialIcons name="refresh" size={24} color="white" />
              <Text style={styles.headerText}>Day Out</Text>
              <Switch
                trackColor={{ false: "#ffff", true: "#ffff" }}
                thumbColor={isEnabled ? "#69f0ae" : "#69f0ae"}
                onValueChange={() => handleSwitch()}
                value={isEnabled}
              />
              <Text style={styles.headerText}>Leave</Text>
            </View>
          </View>

          <ScrollView>
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.profileImage}>
                <Text style={styles.profileImageText}>
                  Profile Image not set
                </Text>
              </View>
              <Text style={styles.profileTitle}>{title}</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
              {tabs.map((tab, index) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    selectedTab === index && styles.selectedTab,
                    { width: SCREEN_WIDTH / tabs.length },
                  ]}
                  onPress={() => handleTabPress(index)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === index && styles.selectedTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Leave Cards ScrollView */}
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / SCREEN_WIDTH);
                setSelectedTab(index);
              }}
            >
              {tabs.map((_, index) => renderTabContent(index))}
            </ScrollView>
          </ScrollView>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.fabButton}>
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortButton}>
              <MaterialIcons name="sort" size={24} color="white" />
              <Text style={styles.sortButtonText}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SignedIn>
    </>
  );
};

const LeaveDetail: React.FC<{
  label: string;
  value: string;
  valueStyle?: object;
}> = ({ label, value, valueStyle = {} }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, valueStyle]}>{value}</Text>
  </View>
);

export default LeaveManagementScreen;
