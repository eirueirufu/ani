"use client";

import { Media } from "@/lib/aniList/home";
import { Card, CardBody, Chip, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function HomeMediaRank(props: {
  title: string;
  media: Array<Media>;
}) {
  const router = useRouter();

  return (
    <div className='container mx-auto max-w-6xl p-3'>
      <h1 className='font-bold text-2xl my-3'>{props.title}</h1>
      <div className='flex flex-col'>
        {props.media.map((item, index) => {
          return (
            <div key={index} className='w-full h-20 flex items-center gap-3'>
              <p className='text-center text-2xl font-bold w-12'>
                #{index + 1}
              </p>
              <Card className='flex flex-1 flex-row gap-1' isPressable>
                <Image
                  key={index}
                  alt={item.title.native}
                  src={item.coverImage.extraLarge}
                  width={52}
                  height={52}
                  className='p-2 object-cover shrink-0'
                  onClick={() => {
                    router.push(
                      `/media/${item.id}?type=${item.type}&isAdult=${item.isAdult}`
                    );
                  }}
                />
                <div className='flex flex-col justify-center gap-1 shrink-0 flex-1 overflow-hidden'>
                  <p className='text-ellipsis overflow-hidden whitespace-nowrap '>
                    {item.title.native}
                  </p>
                  <div className='flex gap-2 overflow-auto'>
                    {item.genres.map((genre, index) => {
                      return (
                        <Chip
                          key={index}
                          style={{
                            backgroundColor: `${item.coverImage.color}`,
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
                    <div>{item.format}</div>
                    <div>{item.episodes} episodes</div>
                  </span>
                  <span>
                    <div>
                      {item.seasonYear}&nbsp;
                      {item.season}
                    </div>
                    <div>{item.status}</div>
                  </span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
