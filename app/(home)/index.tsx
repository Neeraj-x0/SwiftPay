//Form page
import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { useUser, SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import styles from "./homeStyle";
import { useRouter, Redirect, useNavigation } from "expo-router";

interface LeaveReason {
  label: string;
  value: string;
}

interface Authority {
  label: string;
  value: string;
}

interface FormState {
  name: string;
  room: string;
  reason: string;
  actionTakenBy: string;
  dateFrom: Date;
  dateTo: Date;
  description: string;
}

interface Errors {
  name?: string;
  room?: string;
  reason?: string;
  actionTakenBy?: string;
  date?: string;
  submit?: string;
}

interface LeaveActionFormProps {
  navigation: {
    navigate: (route: string, params?: Record<string, any>) => void;
  };
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

const LeaveActionForm: React.FC<LeaveActionFormProps> = ({}) => {
  const user = useUser();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [showFromDate, setShowFromDate] = useState<boolean>(false);
  const [showToDate, setShowToDate] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    name: user.user?.fullName || "",
    room: (user.user?.publicMetadata?.room as string) || "",
    reason: "OTHER",
    actionTakenBy: "RAM_VEER",
    dateFrom: new Date(),
    dateTo: new Date(),
    description: "Shopping",
  });

  const router = useRouter();
  const navigation = useNavigation();
  const signOut = useClerk().signOut;

  useEffect(() => {
    if (!user.isSignedIn) {
      router.push("/");
    }
  }, [user, router]);

  //check every 10 second if user is signed in or not
  useEffect(() => {
    const interval = setInterval(() => {
      if (!user.isSignedIn) {
        router.push("/");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const updateForm = useCallback(
    (field: keyof FormState, value: string | Date) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      //@ts-ignore
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.room.trim()) newErrors.room = "Room number is required";
    if (!form.reason) newErrors.reason = "Please select a reason";
    if (!form.actionTakenBy)
      newErrors.actionTakenBy = "Please select an authority";
    if (form.dateFrom > form.dateTo)
      newErrors.date = "From date cannot be after To date";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submitData = {
        ...form,
        dateFrom: form.dateFrom.toISOString().split("T")[0],
        dateTo: form.dateTo.toISOString().split("T")[0],
      };
      router.setParams(submitData);
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push("/(home)/main");
    } catch (error) {
      console.error("Failed to submit form", error);
      setErrors({ submit: "Failed to submit form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }, [form, validateForm, navigation]);

  const renderError = useCallback(
    (field: keyof Errors) => {
      if (!errors[field]) return null;
      return <Text style={styles.errorText}>{errors[field]}</Text>;
    },
    [errors]
  );

  const datePickerComponent = useMemo(() => {
    if (!showFromDate && !showToDate) return null;

    return (
      <DateTimePicker
        value={showFromDate ? form.dateFrom : form.dateTo}
        mode="date"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={(_, selectedDate) => {
          if (selectedDate) {
            updateForm(showFromDate ? "dateFrom" : "dateTo", selectedDate);
          }
          showFromDate ? setShowFromDate(false) : setShowToDate(false);
        }}
      />
    );
  }, [showFromDate, showToDate, form.dateFrom, form.dateTo, updateForm]);

  interface SelectionGridProps {
    options: { label: string; value: string }[];
    selectedValue: string;
    onSelect: (value: string) => void;
    label: string;
  }
  //@ts-ignore
  const SelectionGrid = ({ options, selectedValue, onSelect, label }) => (
    <View style={styles.gridContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.grid}>
        {options.map(
          (option: {
            value: React.Key | null | undefined;
            label:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.gridButton,
                selectedValue === option.value && styles.gridButtonSelected,
              ]}
              onPress={() => onSelect(option.value)}
            >
              <Text
                style={[
                  styles.gridButtonText,
                  selectedValue === option.value &&
                    styles.gridButtonTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );

  return (
    <>
      <SignedOut>
        <Redirect href={"../"} />;
      </SignedOut>
      <SignedIn>
        <View style={styles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Leave Request</Text>

                <TouchableOpacity onPress={() => handleSignOut()}>
                  <MaterialIcons name="logout" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <View style={styles.profileCard}>
                <Text style={styles.name}>{form.name}</Text>
                <Text style={styles.room}>Room: {form.room}</Text>
              </View>

              <View style={styles.card}>
                <SelectionGrid
                  options={LEAVE_REASONS}
                  selectedValue={form.reason}
                  onSelect={(value: string) => updateForm("reason", value)}
                  label="Reason for Leave"
                />
                {errors.reason && (
                  <Text style={styles.errorText}>{errors.reason}</Text>
                )}

                <SelectionGrid
                  options={AUTHORITIES}
                  selectedValue={form.actionTakenBy}
                  onSelect={(value: string) =>
                    updateForm("actionTakenBy", value)
                  }
                  label="Action Taken By"
                />
                {errors.actionTakenBy && (
                  <Text style={styles.errorText}>{errors.actionTakenBy}</Text>
                )}

                {/* Date Selection Row */}
                <View style={styles.row}>
                  <View
                    style={[
                      styles.inputContainer,
                      { flex: 1, marginRight: 12 },
                    ]}
                  >
                    <Text style={styles.label}>From Date</Text>
                    <TouchableOpacity
                      style={[
                        styles.dateButton,
                        errors.date && styles.inputError,
                      ]}
                      onPress={() => setShowFromDate(true)}
                    >
                      <Text style={styles.dateButtonText}>
                        {form.dateFrom.toLocaleDateString()}
                      </Text>
                      <MaterialIcons
                        name="calendar-today"
                        size={20}
                        color="#64748b"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.inputContainer, { flex: 1 }]}>
                    <Text style={styles.label}>To Date</Text>
                    <TouchableOpacity
                      style={[
                        styles.dateButton,
                        errors.date && styles.inputError,
                      ]}
                      onPress={() => setShowToDate(true)}
                    >
                      <Text style={styles.dateButtonText}>
                        {form.dateTo.toLocaleDateString()}
                      </Text>
                      <MaterialIcons
                        name="calendar-today"
                        size={20}
                        color="#64748b"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {renderError("date")}

                {/* Date Picker Modal */}
                {datePickerComponent}

                {/* Description */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Additional Comments</Text>
                  <TextInput
                    style={[styles.input, styles.input]}
                    value={form.description}
                    onChangeText={(text) => updateForm("description", text)}
                    placeholder="Enter any additional details..."
                    placeholderTextColor="#94a3b8"
                  />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    isSubmitting && styles.submitButtonDisabled,
                  ]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.submitButtonText}>Submit Request</Text>
                  )}
                </TouchableOpacity>

                {/* Submit Error */}
                {errors.submit && (
                  <Text style={[styles.errorText, styles.submitError]}>
                    {errors.submit}
                  </Text>
                )}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SignedIn>
    </>
  );
};

export default LeaveActionForm;
