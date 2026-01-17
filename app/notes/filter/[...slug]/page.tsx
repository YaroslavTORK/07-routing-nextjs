import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import type { NoteTags } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const PER_PAGE = 12;
 
const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? undefined : (slug?.[0] as NoteTags);
  const response = await fetchNotes({
    page: 1,
    perPage: PER_PAGE,
    tag,
    });

  return (
    <div>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </div>
  );
};
export default NotesByCategory;