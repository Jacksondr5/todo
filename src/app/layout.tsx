import "~/styles/globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { HelpWrapper } from "~/components/help/HelpWrapper";
import { EditingProvider } from "~/contexts/EditingContext";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "J5 Todo",
  description: "J5 Todo",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function SignInOutButton({ type }: { type: "signin" | "signout" }) {
  return (
    <button className="absolute top-4 right-4 rounded-full bg-grass-9 px-6 py-2 font-semibold no-underline transition hover:bg-grass-10">
      {type === "signin" ? "Sign in" : "Sign out"}
    </button>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="min-h-screen bg-grass-1">
          <TRPCReactProvider>
            <HydrateClient>
              <EditingProvider>
                <HelpWrapper>
                  <main className="flex flex-col items-center justify-center">
                    <SignedIn>
                      <SignOutButton>
                        <SignInOutButton type="signout" />
                      </SignOutButton>
                      {children}
                    </SignedIn>
                    <SignedOut>
                      <SignInButton>
                        <SignInOutButton type="signin" />
                      </SignInButton>
                      <div className="mt-12 text-2xl text-olive-12">
                        Sign in to start
                      </div>
                    </SignedOut>
                  </main>
                </HelpWrapper>
              </EditingProvider>
            </HydrateClient>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
