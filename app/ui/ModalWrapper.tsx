"use client";

import { useState } from "react";
import Modal from "@/app/ui/Modal";
import CreateTaskButton from "./CreateTaskButton";
import { State } from "../lib/types";

export default function ModalWrapper({
  setState,
}: {
  setState: (state: State) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CreateTaskButton onClick={handleOpenModal} />
      {isModalOpen && <Modal onClose={handleCloseModal} setState={setState} />}
    </>
  );
}
