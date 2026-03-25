import Login from "@/src/modules/auth/login/Login";
import { Suspense } from "react";
import DefaultAuthLayout from "@/src/modules/auth/layout/DefaultAuthLayout";
import LoadingPage from "@/src/components/layouts/LoadingPage";

export const metadata = {
  title: "Login - CIA 14th",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <DefaultAuthLayout>
          <LoadingPage />
        </DefaultAuthLayout>
      }
    >
      <Login />
    </Suspense>
  );
}
