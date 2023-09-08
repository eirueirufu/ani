"use client";

import { useQuery } from "@apollo/client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { MediaType } from "@/lib/aniList/graphql";
import { ReactNode } from "react";
import { GetMedia } from "@/components/media/gql";
import { MediaOverviewCharacters } from "@/components/media/mediaOverviewCharacters";
import { MediaOverviewRecommendations } from "@/components/media/mediaOverviewRecommedations";
import { MediaOverviewRelations } from "@/components/media/mediaOverviewRelations";
import { MediaOverviewStaffs } from "@/components/media/mediaOverviewStaffs";
import { MediaOverviewTrailer } from "@/components/media/mediaOverviewTrailer";

export default function Page({ params }: { params: { id: number } }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { loading, error, data } = useQuery(GetMedia, {
    variables: {
      id: params.id,
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
    <div className='flex flex-col items-center justify-center gap-3'>
      {data?.Media?.relations && (
        <MediaOverviewRelations relations={data.Media.relations} />
      )}
      {data?.Media?.characterPreview && (
        <MediaOverviewCharacters characters={data.Media.characterPreview} />
      )}
      {data?.Media?.staffPreview && (
        <MediaOverviewStaffs staffs={data.Media.staffPreview} />
      )}
      {data?.Media?.trailer && (
        <MediaOverviewTrailer trailer={data.Media.trailer} />
      )}
      {data?.Media?.recommendations && (
        <MediaOverviewRecommendations
          recommendations={data.Media.recommendations}
        />
      )}
    </div>
  );
}
