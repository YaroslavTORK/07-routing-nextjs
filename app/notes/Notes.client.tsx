// 'use client';
// import { useState } from "react";
// import css from "./NotesPage.module.css";
// import { useDebounce } from "use-debounce";
// import { fetchNotes } from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import Pagination from "../../components/Pagination/Pagination";
// import NoteList from "../../components/NoteList/NoteList";
// import Modal from "../../components/Modal/Modal";
// import NoteForm from "../../components/NoteForm/NoteForm";


// const PER_PAGE = 12;

// export default function NotesClient() {
//   const [page, setPage] = useState(1);
//   const [searchText, setSearchText] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [debouncedSearch] = useDebounce(searchText, 400);

//   const fetchParams = {
//     page,
//     perPage: PER_PAGE,
//     search: debouncedSearch.trim() || undefined,
//   };

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["notes", page, PER_PAGE, debouncedSearch],
//     queryFn: () => fetchNotes(fetchParams),
//     placeholderData: (previousData) => previousData,
//   });

//   const notes = data?.notes ?? [];
//   const totalPages = data?.totalPages ?? 0;

//   const onSearchChange = (value: string) => {
//     setSearchText(value);
//     setPage(1);
//   };

//   return (
//     <>
//       <div className={css.app}>
//         <header className={css.toolbar}>
//           {<SearchBox value={searchText} onChange={onSearchChange} />}
//           {totalPages > 1 && (
//             <Pagination
//               page={page}
//               totalPages={totalPages}
//               onPageChange={setPage}
//             />
//           )}
//           {
//             <button className={css.button} onClick={() => setIsModalOpen(true)}>
//               Create note +
//             </button>
//           }
//         </header>

//         {isLoading && <p>Loading...</p>}
//         {isError && <p>Something went wrong</p>}
//         {!isLoading && !isError && notes.length > 0 && (
//           <NoteList notes={notes} />
//         )}

//         {isModalOpen && (
//           <Modal onClose={() => setIsModalOpen(false)}>
//             <NoteForm onClose={() => setIsModalOpen(false)} />
//           </Modal>
//         )}
//       </div>
//     </>
//   );
// }