import { Metadata } from "next";

import Root from "./_components/Root";
import { NameProvider } from "./_lib/contexts/NameProvider";
import getNameFormResponse from "./_lib/name-form-handler";
import "./page.scss";

export const metadata: Metadata = {
  title: "Next.js Material UI Template",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const name = (await searchParams).name;
  return (
    <NameProvider name={name ? await getNameFormResponse(name) : undefined}>
      <Root />
    </NameProvider>
  );
}