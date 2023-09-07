"use client";

import { useQuery } from "@apollo/client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { MediaType } from "@/lib/aniList/graphql";
import { MediaOverviewRelations } from "./mediaOverviewRelations";
import { GetMedia } from "./gql";
import { MediaOverviewCharacters } from "./mediaOverviewCharacters";

export default function Media(props: { id: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { loading, error, data } = useQuery(GetMedia, {
    variables: {
      id: props.id,
      type: searchParams.get("type") as MediaType,
      isAdult: searchParams.get("isAdult") === "true",
    },
  });
  if (loading) {
    return;
  }
  if (error) {
    throw error;
  }

  return (
    <>
      {data?.Media?.bannerImage ? (
        <Image
          alt={data?.Media?.title?.native ?? ""}
          width={"100%"}
          src={data?.Media?.bannerImage}
          radius='none'
          className='h-48 md:h-auto md:max-h-96 object-cover'
          height={320}
        ></Image>
      ) : (
        <div className='h-16'></div>
      )}
      <div className='max-w-5xl mx-auto flex flex-col items-center justify-center gap-3 p-3'>
        <div className='w-full'>
          <Image
            alt={data?.Media?.title?.native ?? ""}
            src={data?.Media?.coverImage?.large ?? ""}
            radius='none'
            width={160}
            height={240}
            className='object-cover float-left mr-3 mb-3'
          ></Image>
          <div className='flex-1 md:block'>
            <h1>{data?.Media?.title?.native}</h1>
            <div
              className='text-xs mt-3'
              dangerouslySetInnerHTML={{
                __html: data?.Media?.description ?? "",
              }}
            />
          </div>
        </div>

        {data?.Media?.relations && (
          <MediaOverviewRelations relations={data?.Media?.relations} />
        )}
        {data?.Media?.characterPreview && (
          <MediaOverviewCharacters characters={data?.Media?.characterPreview} />
        )}
      </div>
    </>
  );
}
