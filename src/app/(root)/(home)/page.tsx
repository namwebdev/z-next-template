"use client";

import { sendNotification } from "@/actions/notification.actions";
import NotificationRequest from "@/components/NotificationRequest";
import { Button } from "@/components/ui/button";

export default function Home() {
  const sendNoti = async (sender_id: number, receiver_id: number) => {
    await sendNotification({
      message: "Hello, you have a new notification",
      sender_id,
      receiver_id,
    });
  };

  return (
    <main className="grid grid-col-2">
      <div>
        I'm user 1<Button>Send notification to user 2</Button>
      </div>

      <div>
        I'm user 2
        <Button onClick={() => sendNoti(2, 1)}>
          Send notification to user 1
        </Button>
      </div>

      <NotificationRequest />
    </main>
  );
}
