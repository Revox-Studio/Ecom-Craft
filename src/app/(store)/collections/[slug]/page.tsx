import { redirect } from "next/navigation";

interface CollectionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionDetailPage({
  params,
}: CollectionDetailPageProps) {
  const { slug } = await params;
  redirect(`/categories/${slug}`);
}
