import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiEdit, FiTrash, FiTrash2 } from 'react-icons/fi';

export default function GoalCard({ title, color, milestones: initialMilestones, onDelete, index }) {
  const [milestones, setMilestones] = useState(
    initialMilestones.map(item => ({ text: item, completed: false, isEditing: false }))
  );
  const [newMilestone, setNewMilestone] = useState("");
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const total = milestones.length;
  const completed = milestones.filter(m => m.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  function toggleMilestone(milestoneIndex) {
    const updated = [...milestones];
    updated[milestoneIndex].completed = !updated[milestoneIndex].completed;
    setMilestones(updated);
  }

  function handleAddMilestone() {
    if (newMilestone.trim() === "") return;
    setMilestones(prev => [...prev, { text: newMilestone, completed: false, isEditing: false }]);
    setNewMilestone("");
  }

  function handleDeleteMilestone(indexToRemove) {
    setMilestones(prev => prev.filter((_, i) => i !== indexToRemove));
  }

  function handleEditMilestone(indexToEdit) {
    setMilestones(prev =>
      prev.map((item, idx) =>
        idx === indexToEdit ? { ...item, isEditing: true } : item
      )
    );
  }

  function handleMilestoneChange(indexToEdit, value) {
    setMilestones(prev =>
      prev.map((item, idx) =>
        idx === indexToEdit ? { ...item, text: value } : item
      )
    );
  }

  function handleMilestoneBlur(indexToEdit) {
    setMilestones(prev =>
      prev.map((item, idx) =>
        idx === indexToEdit ? { ...item, isEditing: false } : item
      )
    );
  }

  function handleTitleEdit() {
    setIsTitleEditing(true);
  }

  function handleTitleSave(e) {
    if (e.key === "Enter" || e.type === "blur") {
      setIsTitleEditing(false);
    }
  }

  return (
    <div className="bg-[#1e1e2f] text-gray-100 p-6 rounded-2xl shadow-lg relative transition hover:shadow-2xl border border-[#2b2b40]">
      <button
        onClick={handleTitleEdit}
        className="absolute top-3 left-3 text-gray-400 hover:text-gray-200"
        title="Edit goal name"
      >
        <FiEdit />
      </button>
      <button
        onClick={() => {
          const confirmDelete = window.confirm("Are you sure you want to delete this goal?");
          if (confirmDelete) {
            onDelete(index);
          }
        }}
        className="absolute top-3 right-3 text-red-400 hover:text-red-600"
        title="Delete Goal"
      >
        <FiTrash2 />
      </button>
      {isTitleEditing ? (
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleTitleSave}
          onBlur={handleTitleSave}
          autoFocus
          className="w-full font-semibold text-lg mb-4 bg-transparent border-b border-gray-600 focus:outline-none"
        />
      ) : (
        <h3 className="text-xl font-semibold text-center mb-4">{editedTitle}</h3>
      )}
      <div className="w-24 h-24 mx-auto mb-6">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: color,
            trailColor: "#374151", 
            textColor: "#e5e7eb",
          })}
        />
      </div>
      <ul className="space-y-3 mb-5">
        {milestones.map((item, milestoneIndex) => (
          <li key={milestoneIndex} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={() => handleEditMilestone(milestoneIndex)}
                className="text-gray-400 hover:text-white"
                title="Edit milestone"
              >
                <FiEdit />
              </button>
              <input
                type="checkbox"
                className="accent-indigo-500"
                checked={item.completed}
                onChange={() => toggleMilestone(milestoneIndex)}
              />
              {item.isEditing ? (
                <input
                  value={item.text}
                  onChange={(e) => handleMilestoneChange(milestoneIndex, e.target.value)}
                  onBlur={() => handleMilestoneBlur(milestoneIndex)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleMilestoneBlur(milestoneIndex);
                  }}
                  autoFocus
                  className="bg-transparent border-b border-gray-600 flex-1 text-sm text-white focus:outline-none"
                />
              ) : (
                <span className={`text-sm ${item.completed ? "line-through text-gray-500" : "text-gray-100"}`}>
                  {item.text}
                </span>
              )}
            </div>
            <button
              onClick={() => handleDeleteMilestone(milestoneIndex)}
              className="text-red-400 hover:text-red-600"
              title="Delete milestone"
            >
              <FiTrash />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
          placeholder="New milestone"
          className="flex-1 bg-[#2b2b40] border border-gray-600 text-sm px-3 py-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddMilestone}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-4 py-2 rounded-lg text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}
