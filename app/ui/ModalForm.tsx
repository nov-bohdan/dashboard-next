import { State } from "@/app/lib/types";

export default function ModalForm({
  formAction,
  state,
}: {
  formAction: (formData: FormData) => void;
  state: State;
}) {
  return (
    <form action={formAction}>
      <div className="flex flex-col items-center font-bold">
        <label htmlFor="title" className="text-4xl mb-3 text-white">
          Title
        </label>
        <input
          name="title"
          type="text"
          className="bg-gray-700 rounded-xl placeholder:text-gray-400 py-2 px-4 text-white"
          placeholder="Title"
        ></input>
        <button
          type="submit"
          className="bg-gray-900 py-3 px-6 rounded-xl mt-5 border-2 border-gray-700 text-white hover:bg-gray-800 transition-colors"
        >
          Create
        </button>
        <p className="text-green-400 mt-2">{state?.message}</p>
        <p className="text-red-400 mt-2">{state?.error}</p>
      </div>
    </form>
  );
}
