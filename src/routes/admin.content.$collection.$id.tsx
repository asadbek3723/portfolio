import { createFileRoute } from "@tanstack/react-router";
import { getCollection } from "@/admin/collections";
import { ContentEditor } from "@/admin/pages/ContentEditor";
import { adminHead } from "@/admin/lib/head";
export const Route = createFileRoute("/admin/content/$collection/$id")({ head: ({ params }) => adminHead(`${getCollection(params.collection)?.label ?? "Kontent"} — tahrirlash`), component: Editor });
function Editor() {
  const { collection, id } = Route.useParams(); const cfg = getCollection(collection);
  return cfg ? <ContentEditor key={`${collection}/${id}`} cfg={cfg} id={id} /> : <h1>Bo'lim topilmadi</h1>;
}