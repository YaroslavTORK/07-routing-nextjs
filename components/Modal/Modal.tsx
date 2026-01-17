"use client"
import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}



interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const close = () => {
    if (onClose) onClose();
    else router.back();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) close();
  };

  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  if (!modalRoot) return null;

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
// export default function Modal({ children, onClose }: ModalProps) {
//   const router = useRouter();
//   // const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

//   const close = () => {
//     if (onClose) onClose();
//     else router.back();
//   };

//   useEffect(() => {
//      setModalRoot(document.getElementById("modal-root"));
//   }, []);

//   useEffect(() => {
//     if (!modalRoot) return;
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") close();
      
//     };

//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = originalOverflow;
//     };
//   }, [modalRoot]);

//   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       close();
//     }
//   };
  
//   if (!modalRoot) return null;

//   return createPortal(
//     <div
//       className={css.backdrop}
//       role="dialog"
//       aria-modal="true"
//       onClick={handleBackdropClick}
//     >
//       <div className={css.modal}>{children}</div>
//     </div>,
//     modalRoot
//   );
// }