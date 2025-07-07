import { useState } from "react";

export default function AddGoal({ onAddGoal }) {
  const [goalTitle, setGoalTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (goalTitle.trim() === "") return;
    onAddGoal(goalTitle);
    setGoalTitle("");
  }

  return (
    <section className="max-w-xl mx-auto bg-[#1f1f1f] p-6 rounded-xl shadow-lg mb-10">
      <h2 className="text-xl font-bold text-white mb-4">Add New Goal</h2>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your goal..."
          value={goalTitle}
          onChange={(e) => setGoalTitle(e.target.value)}
          className="flex-1 bg-[#2a2a2a] text-white placeholder-gray-400 border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition-all duration-200"
        >
          Add
        </button>
      </form>
    </section>
  );
}
