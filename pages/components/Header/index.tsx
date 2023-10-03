import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.png";

interface Props {
  rightElements?: React.ReactElement[];
  onClickLogo?: () => void;
}

const Header = ({ rightElements, onClickLogo }: Props) => {
  return (
    <header className="flex fixed justify-between items-center w-full h-[80px] z-10 px-2 bg-[#2c4563] pointer-events-none">
      <Link href="/" onClick={onClickLogo} className="px-8 pointer-events-auto">
        <Image src={logo} alt="logo" width={180} height={180} />
      </Link>

      {rightElements && <div className="flex px-6">{rightElements}</div>}
    </header>
  );
};

export default Header;
