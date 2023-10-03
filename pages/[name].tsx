import { Fragment } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import type { Store } from "./types/store";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import Header from "./components/Header";
import { VscFeedback } from "react-icons/vsc";
import { AiOutlineShareAlt } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  store: Store;
}

const DetailPage: NextPage<Props> = ({ store: Store }) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex justify-center m-auto h-[100vh]">
        <div className="flex">
          <p className="text-[40px] my-auto">Now Loading... </p>
          <Image
            src="/blocks.gif"
            alt="loadingIcon"
            width={80}
            height={80}
            className="my-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <Header
        rightElements={[
          <div key="div" className="flex">
            <div>
              <button
                key="button"
                onClick={() => {
                  copy(location.origin + "/" + Store.name);
                  toast("URL이 복사되었습니다!");
                }}
                className="p-2 mx-2 rounded-lg bg-gray-400 text-white pointer-events-auto"
              >
                <AiOutlineShareAlt size={25} />
              </button>
            </div>

            <Link
              href="/feedback"
              key="link"
              className="p-2 mx-2 rounded-lg bg-gray-400 text-white pointer-events-auto"
            >
              <VscFeedback size={25} />
            </Link>
          </div>,
        ]}
      />
      <div className="flex justify-center min-h-[100vh] bg-gray-300">
        <div className="w-2/5 mt-[120px] mb-10 px-[5%] rounded-2xl bg-white shadow-2xl">
          <h2 className="mt-10 mb-6 text-[40px] text-center font-bold tracking-widest">
            {Store.name}
          </h2>
          <div className="flex justify-center w-full mb-6">
            {Store.images.slice(0, 3).map((image) => (
              <div key={image}>
                <Image
                  src={image}
                  alt="storeImage"
                  width={300}
                  height={300}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0WhFsDwADzwF2mLYSJgAAAABJRU5ErkJggg=="
                  priority
                />
              </div>
            ))}
          </div>

          <div className="pb-4 border-b-2 tracking-wide">
            <p className="mb-1 font-bold">매장 정보</p>
            <p>{Store.address}</p>
            <p className="mb-1">{Store.phone}</p>
            <a
              href={`https://pcmap.place.naver.com/restaurant/${Store.nid}/home`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <p className="underline text-[#0080ff] font-bold">
                네이버 상세 정보
              </p>
            </a>
          </div>

          <div className="py-4 border-b-2 leading-6 tracking-wide">
            {Store.description}
          </div>

          <div className="py-4 mb-4 tracking-wide">
            <p className="mb-4 font-bold">메뉴</p>
            <div>
              <ul>
                {Store.menus.map((menu) => (
                  <li key={menu.name}>
                    <div className="flex justify-between mb-1">
                      <span>{menu.name}</span>
                      <span>{menu.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default DetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import("../public/stores.json")).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import("../public/stores.json")).default;
  const store = stores.find((store) => store.name === params?.name);

  if (!store) {
    return {
      notFound: true,
    };
  }

  return { props: { store } };
};
