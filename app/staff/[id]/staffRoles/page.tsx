"use client";

import { StaffRoles } from "@/components/staff/staffRoles";

export default function Page({ params }: { params: { id: number } }) {
  return <StaffRoles id={params.id} />;
}
