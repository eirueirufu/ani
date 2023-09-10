import Staff from "@/components/staff/staff";
import { ReactNode } from "react";

export default function Layout({
  params,
  children,
}: {
  params: { id: number };
  children: ReactNode;
}) {
  return (
    <div className='container mx-auto flex flex-col items-center'>
      <Staff id={params.id} />
      {children}
    </div>
  );
}
