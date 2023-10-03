import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.png";

interface Props {
  onClickReturn?: () => void;
}

const Custom404 = ({ onClickReturn }: Props) => {
  return (
    <div className="flex h-[100vh] bg-[#2c4563]">
      <div className="flex w-[600px] h-[400px] m-auto bg-white rounded-3xl tracking-wide">
        <div className="mx-auto mt-[100px]">
          <h1 className="mb-8 text-3xl text-center font-bold">
            해당 매장을 찾을 수 없습니다.
          </h1>
          <Link href="/" onClick={onClickReturn}>
            <p className="text-xl text-center text-gray-500 underline">
              메인페이지로 돌아가기
            </p>
            <Image
              src={logo}
              alt="logo"
              width={180}
              height={180}
              className="mx-auto"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
