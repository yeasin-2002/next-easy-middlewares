import { getPage, pages } from '@/app/source';
import type { Metadata } from 'next';
import { DocsBody, DocsPage } from 'next-docs-ui/page';
import { RollButton } from 'next-docs-ui/components/roll-button';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = getPage(params.slug);

  if (page == null) {
    notFound();
  }

  const MDX = page.data.default;

  return (
    // @ts-ignore
    <DocsPage url={page.url} toc={page.data.toc}>
      <RollButton />
      {/* @ts-ignore */}
      <DocsBody>
        <h1>{page.matter.title}</h1>
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.slugs,
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (page == null) notFound();

  return {
    title: page.matter.title,
    description: page.matter.description,
  } satisfies Metadata;
}
