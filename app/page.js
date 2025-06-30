import Image from "next/image";
import bg from "@/public/bg.png";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        quality={85}
        placeholder="blur"
        alt="Mountains and forests with two cabins"
        className="object-cover object-top"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal text-shadow">
          Welcome to paradise.
        </h1>
        <Link href="/cabins" className="text-shadow-sm">
          Explore luxury cabins/rooms
        </Link>
      </div>
    </main>
  );
}
