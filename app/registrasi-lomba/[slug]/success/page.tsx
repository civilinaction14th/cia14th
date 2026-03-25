"use client";

import { useParams } from "next/navigation";
import Success from "@/src/modules/register-lomba/Success";

export default function SuccessPage() {
  const params = useParams();
  const slug = params.slug as string;
  return <Success slug={slug} />;
}
