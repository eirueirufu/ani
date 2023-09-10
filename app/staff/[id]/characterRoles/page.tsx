"use client";

import { CharacterRoles } from "@/components/staff/characterRoles";

export default function Page({ params }: { params: { id: number } }) {
  return <CharacterRoles id={params.id} />;
}
