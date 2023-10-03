import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import DetailContent from "./DetailContent";
import { CURRENT_STORE_KEY } from "../../hooks/useCurrentStore";
import { Store } from "../../types/store";
import { BiArrowBack } from "react-icons/bi";

const DetailSection = () => {
  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY);

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`absolute z-10 bg-white rounded-xl top-[120px] right-8 w-[30%] h-[80%] duration-700 
      ${expanded ? " " : "translate-x-[97%]"}`}
    >
      <div className="flex h-full">
        <div className="flex h-full w-[60px] rounded-l-xl bg-[#ee744e]">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`m-auto hover:scale-125 duration-100 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <BiArrowBack size={30} color="white" />
          </button>
        </div>

        <div className="w-full">
          <div className="my-10 font-bold text-3xl text-center tracking-widest">
            {!currentStore && <p>매장을 선택해주세요!</p>}
            {currentStore && (
              <Link href={`/${currentStore.name}`} key="link">
                {currentStore.name}
              </Link>
            )}
          </div>
          <DetailContent currentStore={currentStore} expanded={expanded} />
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
