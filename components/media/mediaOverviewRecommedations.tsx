import { graphql, useFragment, FragmentType } from "@/lib/aniList";
import { GetMediaOverviewRecommendations } from "./gql";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function MediaOverviewRecommendations(props: {
  recommendations: FragmentType<typeof GetMediaOverviewRecommendations>;
}) {
  const router = useRouter();

  const recommendations = useFragment(
    GetMediaOverviewRecommendations,
    props.recommendations
  );

  return (
    <div className='w-full'>
      <p>RECOMMENDATIONS</p>
      <div className='grid grid-cols-3 md:grid-cols-6 gap-6'>
        {recommendations.nodes?.map((item, index) => {
          return (
            <Card
              key={index}
              shadow='none'
              isPressable
              isHoverable
              onClick={() => {
                router.push(
                  `/media/${item?.mediaRecommendation?.id}?type=${item
                    ?.mediaRecommendation?.type}&isAdult=${false}`
                );
              }}
            >
              <CardBody className='p-0 items-center'>
                <Image
                  alt={item?.mediaRecommendation?.title?.userPreferred ?? ""}
                  src={item?.mediaRecommendation?.coverImage?.large ?? ""}
                  className='object-cover'
                  height={178}
                  width={178}
                />
                <p className='text-xs md:text-sm font-bold my-auto text-center p-3'>
                  {item?.mediaRecommendation?.title?.userPreferred}
                </p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
