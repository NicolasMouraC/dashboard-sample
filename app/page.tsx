import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center" role="main">
      <div
        className="flex flex-col gap-5 items-center"
        aria-labelledby="dashboard-title"
      >
        <h1 id="dashboard-title" className="font-normal text-[30px]">
          Dashboard Sample
        </h1>
        <Link href="dashboard" passHref>
          <Button aria-label="Go to dashboard">Go to dashboard</Button>
        </Link>
      </div>
    </main>
  );
}
