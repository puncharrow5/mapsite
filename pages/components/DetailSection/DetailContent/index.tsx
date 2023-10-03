import React from "react";
import Image from "next/image";
import { Store } from "../../../types/store";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

type Props = {
  currentStore?: Store;
  expanded?: boolean;
};

const DetailContent = ({ currentStore, expanded }: Props) => {
  if (!currentStore) return null;
  return (
    <div className="flex-col mx-10">
      <Carousel
        autoPlay
        showThumbs={false}
        infiniteLoop
        className="flex w-full mb-6"
      >
        {currentStore.images.slice(0, 3).map((image) => (
          <div className="flex-row h-[240px]" key={image}>
            <Image
              src={image}
              alt="storeImage"
              fill
              sizes="120px"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0WhFsDwADzwF2mLYSJgAAAABJRU5ErkJggg=="
              priority
            />
          </div>
        ))}
      </Carousel>
      {expanded && (
        <div className="text-sm">
          <div className="pb-4 border-b-2">
            <p className="font-bold mb-1">매장 정보</p>
            <p>{currentStore.address || "정보가 없습니다."}</p>
            <p className="mb-1">{currentStore.phone || "정보가 없습니다."}</p>
            <a
              href={`https://pcmap.place.naver.com/restaurant/${currentStore.nid}/home`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <a className="underline text-[#0080ff] font-bold">
                네이버 상세 정보
              </a>
            </a>
          </div>

          <p className="my-2 pb-2 border-b-2">{currentStore.description}</p>

          <p className="mb-1 pb-1 font-bold">메뉴</p>
          <ul>
            {currentStore.menus?.slice(0, 4).map((menu) => (
              <li key={menu.name}>
                <div className="flex justify-between">
                  <span>{menu.name}</span>
                  <span>{menu.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailContent;
