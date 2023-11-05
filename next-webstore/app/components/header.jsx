import Link from "next/link";

const header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link rel="stylesheet" href="/">
          next danube
        </Link>
      </div>
      <div className="links">
        <Link href="/login">login</Link>
        <Link href="/cart">cart</Link>
        <Link href="/user">account</Link>
      </div>
    </header>
  );
};

export default header;
