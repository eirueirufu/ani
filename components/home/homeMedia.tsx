"use client";

import { Media } from "@/lib/aniList/home";
import { Card, CardBody, Image } from "@nextui-org/react";

export default function HomeMedia(props: {
  title: string;
  media: Array<Media>;
}) {
  return (
    <div className='container mx-auto max-w-6xl p-3'>
      <h1 className='font-bold text-2xl my-3'>{props.title}</h1>
      <div className='flex justify-between flex-wrap'>
        {props.media.map((item, index) => {
          return (
            <Card key={index} shadow='sm' isPressable className='w-44'>
              <CardBody className='p-0'>
                <Image
                  key={index}
                  alt={item.title.native}
                  src={item.coverImage.extraLarge}
                  className='w-44 h-52 object-cover'
                />
                <p className='text-small font-bold my-auto text-center p-3'>
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
