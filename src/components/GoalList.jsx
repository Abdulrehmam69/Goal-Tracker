import GoalCard from "./GoalCard";

export default function GoalList({ goals, onDelete }) {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal, index) => (
        <GoalCard
          key={index}
          index={index}           
          title={goal.title}
          color={goal.color}
          milestones={goal.milestones}
          onDelete={onDelete}    
        />
      ))}
    </section>
  );
}
