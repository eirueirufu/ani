import { graphql, useFragment, FragmentType } from "@/lib/aniList";
import { GetMediaOverviewRelations } from "./gql";
import { useRouter } from "next/navigation";
import { Card, CardBody, Image } from "@nextui-org/react";

export function MediaOverviewRelations(props: {
  relations: FragmentType<typeof GetMediaOverviewRelations>;
}) {
  const relations = useFragment(GetMediaOverviewRelations, props.relations);
  const router = useRouter();

  return (
    <div className='w-full'>
      <p>RELATIONS</p>
      <div className='flex flex-wrap gap-3'>
        {relations?.edges?.map((item, index) => {
          return (
            <Card
              key={index}
              radius='none'
              isPressable
              isHoverable
              onClick={() => {
                router.push(
                  `/media/${item?.node?.id}?type=${item?.node
                    ?.type}&isAdult=${false}`
                );
              }}
            >
              <CardBody className='p-0 relative'>
                <Image
                  alt={item?.node?.title?.userPreferred ?? ""}
                  src={item?.node?.coverImage?.large ?? ""}
                  radius='none'
                  width={52}
                  height={96}
                  className='object-cover'
                />
                <p className='text-xs absolute bottom-0 dark:bg-black/[.5] bg-white/[.5] z-10 w-full text-center'>
                  {item?.relationType}
                </p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
