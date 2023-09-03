"use client";

import { Media } from "@/lib/aniList/home";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function HomeMedia(props: {
  title: string;
  media: Array<Media>;
}) {
  const router = useRouter();

  return (
    <div className='container mx-auto max-w-6xl p-3'>
      <h1 className='font-bold text-2xl my-3'>{props.title}</h1>
      <div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
        {props.media.map((item, index) => {
          return (
            <Card
              key={index}
              shadow='sm'
              isPressable
              onClick={() => {
                router.push(
                  `/media/${item.id}?type=${item.type}&isAdult=${item.isAdult}`
                );
              }}
            >
              <CardBody className='p-0'>
                <Image
                  key={index}
                  alt={item.title.native}
                  src={item.coverImage.extraLarge}
                  className='object-cover'
                />
                <p className='text-xs md:text-sm font-bold my-auto text-center p-3'>
                  {item.title.native}
                </p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
