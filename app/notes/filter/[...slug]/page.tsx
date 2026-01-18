// import type { NoteTags } from "@/types/note";
// import NotesClient from "./Notes.client";

// type Props = {
//   params: Promise<{ slug: string[] }>;
// };

// const NotesByCategory = async ({ params }: Props) => {
//   const { slug } = await params;
//   const tag = slug?.[0] === "all" ? undefined : (slug?.[0] as NoteTags);

//   return <NotesClient tag={tag} />;
// };

// export default NotesByCategory;
import type { NoteTags } from "@/types/note";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const PER_PAGE = 12;

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? undefined : (slug?.[0] as NoteTags);

  const queryClient = new QueryClient();
  const page = 1;
  const debouncedSearch = "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, PER_PAGE, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;