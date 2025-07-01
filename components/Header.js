import Image from "next/image";
import vercel from "@/public/vercel.svg";
import Link from "next/link";
import icon from "@/app/icon.png";
import { auth } from "@/lib/auth";
export default async function Header() {
  const session = await auth();
  return (
    <header className="border-b border-primary-900 px-8 relative z-10 py-4">
      <div className=" text-shadow-sm flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex flex-row justify-center items-center gap-4">
          <Image src={icon} alt="Baithak" width={59} height={59} />
          <Link href="/">
            <h1 className="font-bold text-2xl ">Baithak</h1>
          </Link>
        </div>
        <nav>
          <ul className="flex gap-5 ">
            <li>
              <Link href="/cabins" className="text-2xl">
                Cabins
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-2xl">
                About
              </Link>
            </li>
            <li>
              <Link href="/account" className="text-2xl">
                {session ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Image
                        src={session.user.image}
                        alt="User"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <p>Sign In</p>
                    </div>
                  </>
                ) : (
                  "Account"
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
