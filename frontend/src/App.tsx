import { useState, useEffect, use } from "react";
import type { Board } from "./types";
import { getBoards, createBoard } from "./api";

function App() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      setLoading(true);
      const data = await getBoards();
      setBoards(data);
    } catch (err) {
      setError("Failed to load boards");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async () => {
    try {
      await createBoard("My Job Search");
      await loadBoards();
    } catch (err) {
      setError("Failed to create board");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-2x1 font-bold text-gray-800">Job Tracker</h1>
        {boards.length === 0 && (
          <button
            onClick={handleCreateBoard}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Board
          </button>
        )}
      </header>
      <main className="p-6">
        {boards.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">
              No boards yet. Create one to get started!
            </p>
          </div>
        ) : (
          <p className="text-gray-600">
            Board loaded! Component coming next...
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
