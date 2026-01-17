import { fetchNotes } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NotesClient from "../../app/notes/filter/[...slug]/Notes.client";

const PER_PAGE = 12;

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, PER_PAGE, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: undefined }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
