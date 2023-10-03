import { Fragment, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import copy from "copy-to-clipboard";
import Header from "./components/Header";
import MapSection from "./components/MapSection";
import DetailSection from "./components/DetailSection";
import useMap from "./hooks/useMap";
import useStores from "./hooks/useStores";
import { Store } from "./types/store";
import { toast } from "react-toastify";
import { AiOutlineShareAlt } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";

interface Props {
  stores: Store[];
}

export async function getStaticProps() {
  const stores = (await import("../public/stores.json")).default;

  return {
    props: { stores },
    revalidate: 60 * 60 * 2,
  };
}

const Home = ({ stores }: { stores: Store[] }) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  const { resetMapOption, getMapOption } = useMap();

  const router = useRouter();

  const copyUrl = useCallback(() => {
    const mapOption = getMapOption();
    const query = `/?zoom=${mapOption.zoom}&lat=${mapOption.center[0]}&lng=${mapOption.center[1]}`;

    router.replace(query);

    copy(location.origin + query);
    toast("현위치의 URL이 복사되었습니다!");
  }, [router, getMapOption]);

  return (
    <Fragment>
      <Header
        onClickLogo={resetMapOption}
        rightElements={[
          <div key="div" className="flex">
            <button
              key="button"
              onClick={copyUrl}
              className="p-2 mx-2 rounded-lg bg-gray-400 text-white pointer-events-auto"
            >
              <AiOutlineShareAlt size={25} />
            </button>

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
      <main className="relative overflow-hidden">
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};

export default Home;
