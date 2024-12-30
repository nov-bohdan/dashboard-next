export default function CreateTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-semibold rounded-lg shadow-md hover:from-gray-600 hover:via-gray-800 hover:to-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-transform transform hover:scale-105 ml-auto"
    >
      Create Task
    </button>
  );
}
