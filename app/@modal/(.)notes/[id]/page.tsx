import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const dateLabel = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

 return (
    <NotePreviewClient
      title={note.title}
      content={note.content}
      tag={note.tag}
      dateLabel={dateLabel}
    />
  );
}