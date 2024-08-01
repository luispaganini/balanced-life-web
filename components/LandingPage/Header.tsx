// components/Header.tsx
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-cyan-bg text-white p-4">
      <nav className="container mx-auto flex justify-center space-x-4">
        <Link href="/">
          Home
        </Link>
        <Link href="#features">
          Features
        </Link>
        <Link href="#contact">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
