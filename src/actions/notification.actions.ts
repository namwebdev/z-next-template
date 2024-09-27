"use server";

import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq } from "drizzle-orm";
import webpush from "web-push";

export const createNotification = async (data: string) => {
  try {
    await db.insert(notifications).values({
      notification_json: data,
    });
    return true;
  } catch (error) {
    console.error("createNotification action: ", error);
    return false;
  }
};

interface Notification {
  sender_id: number;
  receiver_id: number;
  message: string;
}
export const sendNotification = async ({
  message,
  sender_id,
  receiver_id,
}: Notification) => {
  const _notifications = await db
    .select()
    .from(notifications)
    .where(eq(notifications.id, receiver_id));

  if (!notifications) {
    return false;
  }

  const noti = _notifications[0];
  const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
    privateKey: process.env.VAPID_PRIVATE_KEY!,
  };
  webpush.setVapidDetails(
    "mailto:myuserid@email.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  try {
    await webpush.sendNotification(
      JSON.parse(noti.notification_json),
      JSON.stringify({
        message: sender_id,
        body: message,
      })
    );
    return "{}";
  } catch (e) {
    return JSON.stringify({ error: "failed to send notification" });
  }
};
