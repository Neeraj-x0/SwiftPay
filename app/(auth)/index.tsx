import React from "react";
import { useUser, useClerk } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Auth() {
  const { user } = useUser();
  const clerk = useClerk();

  setInterval(() => {
    console.log("Reloading session");
    clerk.session?.reload();
  }, 25 * 1000);

  if (user) {
    return <Redirect href={"../(home)"} />;
  } else {
    return <Redirect href={"./signin"} />; // Make sure to return this
  }
}
