import Link from "next/link";
import { Task } from "~/components/Task";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();
  console.log(session);
  if (session?.user) {
    // void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-grass-1 bg-linear-to-b">
        <Link
          className="rounded-full bg-grass-9 px-10 py-3 font-semibold no-underline transition hover:bg-grass-10"
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Task title="Task 1" isBlocked={false} isDone={false} />
          <Task title="Task 2" isBlocked isDone={false} />
          <Task title="Task 3" isBlocked={false} isDone />
        </div>
      </main>
    </HydrateClient>
  );
}
