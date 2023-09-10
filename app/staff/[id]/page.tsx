import Staff from "@/components/staff/staff";
import { StaffMedia } from "@/components/staff/staffMedia";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <div className='flex flex-col items-center'>
      <Staff id={params.id} />
      <StaffMedia id={params.id} />
    </div>
  );
}
