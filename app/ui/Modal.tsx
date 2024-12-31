import { useActionState } from "react";
import { createNewTask } from "@/app/lib/actions";
import ModalForm from "./ModalForm";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { State } from "@/app/lib/types";

const initialState: State = {
  error: "",
  message: "",
};

export default function Modal({
  onClose,
  setState,
}: {
  onClose: () => void;
  setState: (state: State) => void;
}) {
  const [state, formAction, pending] = useActionState(
    createNewTask,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      onClose();
      setState(state);
    } else {
      setState(state);
    }
  }, [state, onClose, setState]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="w-full h-screen bg-gray-800 absolute top-0 left-0 bg-opacity-75 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-gray-900 p-20 rounded-xl relative shadow-xl">
        <p
          onClick={onClose}
          className="text-4xl cursor-pointer absolute top-5 right-10 font-bold text-white hover:text-gray-400 transition-colors"
        >
          X
        </p>
        {pending ? (
          <Spinner />
        ) : (
          <ModalForm formAction={formAction} state={state} />
        )}
      </div>
    </div>
  );
}
