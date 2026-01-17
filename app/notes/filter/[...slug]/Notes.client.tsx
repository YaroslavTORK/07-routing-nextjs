"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import css from "./NotesPage.module.css";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { NoteTags } from "@/types/note";

const PER_PAGE = 12;

type Props = {
  tag?: NoteTags;
};

export default function NotesClient({ tag }: Props) {
 const router = useRouter();
  const searchParams = useSearchParams();
  const page = useMemo(() => {
    const value = Number(searchParams.get("page") ?? "1");
    return Number.isFinite(value) && value > 0 ? value : 1;
  }, [searchParams]);

  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(searchText, 400);

  const search = debouncedSearch.trim() || undefined;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, PER_PAGE, debouncedSearch, tag],
    queryFn: () => fetchNotes({
      page,
      perPage: PER_PAGE,
      search,
      tag,
    }),
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const onSearchChange = (value: string) => {
    setSearchText(value);
    router.push(`?page=1`);
  };
  
  const onPageChange = (nextPage: number) => {
    router.push(`?page=${nextPage}`);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchText} onChange={onSearchChange} />

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}