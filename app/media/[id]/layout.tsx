import MediaLayout from "@/components/media/mediaLayout";

export default function Layout({
  params,
  children,
}: {
  params: { id: number };
  children: React.ReactNode;
}) {
  return <MediaLayout id={params.id}>{children}</MediaLayout>;
}
