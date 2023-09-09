import { graphql, useFragment, FragmentType } from "@/lib/aniList";
import { GetMediaOverviewStaffs } from "./gql";
import { useRouter } from "next/navigation";
import { Card, CardBody, Image } from "@nextui-org/react";

export function MediaOverviewStaffs(props: {
  staffs: FragmentType<typeof GetMediaOverviewStaffs>;
}) {
  const staffs = useFragment(GetMediaOverviewStaffs, props.staffs);
  const router = useRouter();

  return (
    <div className='w-full'>
      <p>STAFFS</p>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
        {staffs?.edges?.map((item, index) => {
          return (
            <Card
              key={index}
              radius='none'
              isPressable
              isHoverable
              onClick={() => {
                router.push(`/staff/${item?.node?.id}`);
              }}
            >
              <CardBody className='p-0 flex flex-row justify-between'>
                <div className='flex items-center justify-start shrink-0'>
                  <Image
                    alt={item?.node?.name?.userPreferred ?? ""}
                    src={item?.node?.image?.large ?? ""}
                    radius='none'
                    className='object-cover'
                    height={72}
                    width={40}
                  />
                  <div className='flex flex-col justify-between h-full p-3 shrink-0'>
                    <p className='text-xs w-24 overflow-hidden whitespace-nowrap text-ellipsis'>
                      {item?.node?.name?.userPreferred ?? ""}
                    </p>
                    <p className='text-xs w-24 overflow-hidden whitespace-nowrap text-ellipsis'>
                      {item?.role}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
