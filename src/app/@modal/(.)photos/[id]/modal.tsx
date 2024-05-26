"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (!dialogRef.current.open) dialogRef.current?.showModal();
    dialogRef.current.addEventListener("click", (event) => {
      if (event.target === dialogRef.current) dialogRef.current?.close();
    });
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="absolute h-screen w-screen bg-black/90">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        {children}
        {/* <button onClick={onDismiss} className="close-button" /> */}
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}
