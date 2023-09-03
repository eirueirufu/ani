import Media from "@/components/media/media";

export default function Page({ params }: { params: { id: number } }) {
  return <Media id={params.id} />;
}
