"use client";

import { createNotification } from "@/actions/notification.actions";
import { BellOff, BellRing } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function NotificationRequest() {
  const [notificationPermission, setNotificationPermission] = useState<
    "granted" | "denied" | "default"
  >("granted");

  const showNotification = () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") return;

      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission === "granted") {
          subscribeUser();
          return;
        }

        alert("please go to setting and enable notification.");
      });

      return;
    }
    console.error("This browser does not support notification.");
    alert("This browser does not support notifications.");
  };

  async function subscribeUser() {
    if ("serviceWorker" in navigator) {
      try {
        // Check if service worker is already registered
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          generateSubscribeEndPoint(registration);
        } else {
          // Register the service worker
          const newRegistration = await navigator.serviceWorker.register(
            "/sw.js"
          );
          // Subscribe to push notifications
          generateSubscribeEndPoint(newRegistration);
        }
      } catch (error) {
        alert("Error during service worker registration or subscription:");
      }

      return;
    }
    alert("Service workers are not supported in this browser");
  }

  const generateSubscribeEndPoint = async (
    newRegistration: ServiceWorkerRegistration
  ) => {
    const applicationServerKey = urlB64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_KEY!
    );
    const options = {
      applicationServerKey,
      userVisibleOnly: true, // This ensures the delivery of notifications that are visible to the user, eliminating silent notifications. (Mandatory in Chrome, and optional in Firefox)
    };
    const subscription = await newRegistration.pushManager.subscribe(options);
    console.log("🚀 ~ NotificationRequest ~ subscription:", subscription);

    const res = await createNotification(JSON.stringify(subscription));
    if (!res) {
      alert("Error during subscription");
    }
  };

  const removeNotification = async () => {
    setNotificationPermission("denied");
  };

  useEffect(() => {
    showNotification();
    setNotificationPermission(Notification.permission);
  }, []);

  // if (isFetching) {
  // 	return null;
  // }
  return (
    <div className=" hover:scale-110 cursor-pointer transition-all">
      {notificationPermission === "granted" ? (
        <BellRing onClick={removeNotification} />
      ) : (
        <BellOff onClick={showNotification} />
      )}
    </div>
  );
}

function urlB64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
