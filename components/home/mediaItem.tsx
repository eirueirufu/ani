import { useFragment, FragmentType } from "@/lib/aniList";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { HomeMedia } from "./home";

export function MediaItem(props: { media: FragmentType<typeof HomeMedia> }) {
  const media = useFragment(HomeMedia, props.media);
  const router = useRouter();
  return (
    <Card
      shadow='sm'
      isPressable
      isHoverable
      onClick={() => {
        router.push(
          `/media/${media.id}?type=${media.type}&isAdult=${media.isAdult}`
        );
      }}
    >
      <CardBody className='p-0'>
        <Image
          alt={media.title?.native ?? ""}
          src={media.coverImage?.extraLarge ?? ""}
          className='object-cover'
          height={256}
          width={178}
        />
        <p className='text-xs md:text-sm font-bold my-auto text-center p-3'>
          {media.title?.native}
        </p>
      </CardBody>
    </Card>
  );
}
