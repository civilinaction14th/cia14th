import Register from "@/src/modules/auth/register/Register";
import { Suspense } from "react";
import DefaultAuthLayout from "@/src/modules/auth/layout/DefaultAuthLayout";
import LoadingPage from "@/src/components/layouts/LoadingPage";

export const metadata = {
  title: "Daftar | CIA 14th | Civil In Action",
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <DefaultAuthLayout>
          <LoadingPage />
        </DefaultAuthLayout>
      }
    >
      <Register />
    </Suspense>
  );
}
