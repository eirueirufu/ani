import { useFragment, FragmentType } from "@/lib/aniList";
import { Card, CardBody, Chip, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { HomeMedia } from "./home";

export function TopMediaItem(props: {
  index: number;
  media: FragmentType<typeof HomeMedia>;
}) {
  const media = useFragment(HomeMedia, props.media);
  const router = useRouter();
  return (
    <div className='w-full h-20 flex items-center gap-3'>
      <p className='text-center text-2xl font-bold w-12'>#{props.index + 1}</p>
      <Card
        className='w-full'
        isPressable
        isHoverable
        onClick={() => {
          router.push(
            `/media/${media.id}?type=${media.type}&isAdult=${media.isAdult}`
          );
        }}
      >
        <CardBody className='p-0 flex flex-1 flex-row gap-1'>
          <Image
            alt={media?.title?.native ?? ""}
            src={media?.coverImage?.extraLarge ?? ""}
            width={52}
            height={52}
            className='p-2 object-cover shrink-0'
          />
          <div className='flex flex-col justify-center gap-1 shrink-0 flex-1 overflow-hidden'>
            <p className='text-ellipsis overflow-hidden whitespace-nowrap '>
              {media?.title?.native}
            </p>
            <div className='flex gap-2 overflow-auto'>
              {media?.genres?.map((genre, index) => {
                return (
                  <Chip
                    key={index}
                    style={{
                      backgroundColor: `${media?.coverImage?.color}`,
                    }}
                    size='sm'
                    className='flex-shrink-0'
                  >
                    <p className='dark:mix-blend-difference'>{genre}</p>
                  </Chip>
                );
              })}
            </div>
          </div>
          <div className='w-1/3 md:grid grid-cols-2 justify-start items-center gap-5 shrink-0 text-ellipsis overflow-hidden whitespace-nowrap mr-4 hidden '>
            <span>
              <div>{media?.format}</div>
              <div>{media?.episodes} episodes</div>
            </span>
            <span>
              <div>
                {media?.seasonYear}&nbsp;
                {media?.season}
              </div>
              <div>{media?.status}</div>
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
