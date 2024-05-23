function spyInput() {
  return (
    <div className="flex flex-col items-center w-full p-4">
      <input
        type="text"
        placeholder="Input 1"
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Input 2"
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => console.log("Commit 1 clicked")}
        >
          Commit 1
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => console.log("Commit 2 clicked")}
        >
          Commit 2
        </button>
      </div>
    </div>
  );
}

export default spyInput;
