import { Suspense } from "react";
import VerificationPageContent from "../components/verification-page-content";

const VerificationPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerificationPageContent />
    </Suspense>
  );
};

const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
  </div>
);

export default VerificationPage;
