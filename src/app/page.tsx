import { Task } from "~/components/Task";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const session = await auth();

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-grass-1 bg-linear-to-b">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Task title="Task 1" />
          <Task title="Task 2" isBlocked />
          <Task title="Task 3" />
        </div>
      </main>
    </HydrateClient>
  );
}
