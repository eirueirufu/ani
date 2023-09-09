import { graphql, useFragment, FragmentType } from "@/lib/aniList";
import { GetMediaOverviewCharacters } from "./gql";
import { useRouter } from "next/navigation";
import { Card, CardBody, Image } from "@nextui-org/react";

export function MediaOverviewCharacters(props: {
  characters: FragmentType<typeof GetMediaOverviewCharacters>;
}) {
  const characters = useFragment(GetMediaOverviewCharacters, props.characters);
  const router = useRouter();

  return (
    <div className='w-full'>
      <p>CHARACTERS</p>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
        {characters?.edges?.map((item, index) => {
          return (
            <Card key={index} radius='none' isHoverable onClick={() => {}}>
              <CardBody className='p-0 flex flex-row justify-between'>
                <div className='flex items-center justify-start shrink-0'>
                  <Image
                    alt={item?.node?.name?.userPreferred ?? ""}
                    src={item?.node?.image?.large ?? ""}
                    radius='none'
                    className='object-cover'
                    height={96}
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
                <div className='hidden md:flex items-center justify-end shrink-0'>
                  {item?.voiceActors?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className='flex items-center justify-end h-full'
                        onClick={() => {
                          router.push(`/staff/${item?.id}`);
                        }}
                      >
                        <div className='flex flex-col justify-between h-full p-3'>
                          <p className='text-right text-xs w-24 overflow-hidden whitespace-nowrap text-ellipsis'>
                            {item?.name?.userPreferred}
                          </p>
                          <p className='text-right text-xs w-24 overflow-hidden whitespace-nowrap text-ellipsis'>
                            {item?.language}
                          </p>
                        </div>
                        <Image
                          alt={item?.name?.userPreferred ?? ""}
                          src={item?.image?.large ?? ""}
                          radius='none'
                          className='object-cover'
                          height={96}
                          width={40}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
