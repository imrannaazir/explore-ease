"use client";
import { AppStore, store } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";
const Provider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }

  return (
    <ReduxProvider store={storeRef.current}>
      <Toaster position="top-center" />
      {children}
    </ReduxProvider>
  );
};

export default Provider;
