"use client";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <Toaster position="top-center" />
      {children}
    </ReduxProvider>
  );
};

export default Provider;
