"use client";

import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

type Props = {
  title: string;
  content: string;
  tag?: string;
  dateLabel: string;
};

export default function NotePreviewClient({ title, content, tag, dateLabel }: Props) {
  return (
    <Modal>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{title}</h2>
            {tag ? <span className={css.tag}>{tag}</span> : null}
          </div>

          <p className={css.content}>{content}</p>
          <p className={css.date}>{dateLabel}</p>
        </div>
      </div>
    </Modal>
  );
}