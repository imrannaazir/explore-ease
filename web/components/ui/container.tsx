import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  className?: ClassValue;
  children: ReactNode;
}) => {
  return (
    <div className={cn("px-4 md:px-6 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
