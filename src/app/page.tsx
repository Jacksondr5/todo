import Link from "next/link";
import { EditingProvider } from "~/contexts/EditingContext";
import { TaskList } from "~/components/TaskList";
import { auth } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";
import { TaskProvider } from "~/contexts/TaskContext";
import { HelpWrapper } from "~/components/help/HelpWrapper";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    void api.todo.get.prefetch();
  }

  return (
    <HydrateClient>
      <EditingProvider>
        <HelpWrapper>
          <main className="flex flex-col items-center justify-center">
            <Link
              className="absolute top-4 right-4 rounded-full bg-grass-9 px-6 py-2 font-semibold no-underline transition hover:bg-grass-10"
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
            {session && (
              <TaskProvider>
                <TaskList />
              </TaskProvider>
            )}
            {!session && (
              <div className="mt-12 text-2xl text-olive-12">
                Sign in to start
              </div>
            )}
          </main>
        </HelpWrapper>
      </EditingProvider>
    </HydrateClient>
  );
}
