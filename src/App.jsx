import { useState } from 'react';
import { FaBullseye } from "react-icons/fa";

import Header from "./components/Header";
import AddGoal from "./components/AddGoal";
import GoalList from "./components/GoalList";

export default function App() {
  const [goals, setGoals] = useState([]);

  function handleDeleteGoal(indexToRemove) {
    setGoals((prevGoals) =>
      prevGoals.filter((_, index) => index !== indexToRemove)
    );
  }

  function handleAddGoal(title) {
    const newGoal = {
      title: title,
      percentage: 0,
      color: "#6366f1",
      milestones: [],
    };
    setGoals((prev) => [...prev, newGoal]);
  }

  return (
    <div className="min-h-screen px-6 py-10 text-white bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a]">
      <Header />
      <AddGoal onAddGoal={handleAddGoal} />

      {goals.length === 0 && (
        <p className="text-center text-3xl md:text-4xl font-bold text-gray-300 mt-16 tracking-wide drop-shadow-md">
          Enter Your G
          <span className="inline-block text-indigo-500 align-middle mx-1 animate-pulse drop-shadow-lg -translate-y-[5px]">
            <FaBullseye className="inline-block text-3xl md:text-4xl mb-1" />
          </span>
          AL
        </p>
      )}

      <GoalList goals={goals} onDelete={handleDeleteGoal} />
    </div>
  );
}
