import { createFileRoute } from "@tanstack/react-router";
import { getCollection } from "@/admin/collections";
import { CollectionList } from "@/admin/pages/CollectionList";
import { adminHead } from "@/admin/lib/head";
export const Route = createFileRoute("/admin/content/$collection/")({ head: ({ params }) => adminHead(getCollection(params.collection)?.label ?? "Kontent"), component: Collection });
function Collection() {
  const { collection } = Route.useParams(); const cfg = getCollection(collection);
  return cfg ? <CollectionList cfg={cfg} /> : <h1>Bo'lim topilmadi</h1>;
}