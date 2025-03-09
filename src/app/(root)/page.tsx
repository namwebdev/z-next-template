"use client";

import { Button } from "@/components/ui/button";
import { useConfirmDialogStore } from "@/hooks/use-dialog-store";

export default function Home() {
  const { openDialog } = useConfirmDialogStore();

  const handleConfirm = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      })
    });

    console.log(res);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Home Page
      <Button onClick={() => openDialog({
        title: "Confirm",
        description: "Are you sure you want to confirm?",
        onConfirm: handleConfirm,
      })}>Open Dialog</Button>
    </div>
  );
}
