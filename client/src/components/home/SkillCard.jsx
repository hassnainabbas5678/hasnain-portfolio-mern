import SkillRow from "./SkillRow";

export default function SkillCard({ title, items, active }) {
  return (
    <div className="glass neon-border rounded-2xl p-7">
      <h3 className="text-lg font-semibold">{title}</h3>

      <div className="mt-7 space-y-5">
        {items.map((s) => (
          <SkillRow key={s.name} name={s.name} value={s.value} active={active} />
        ))}
      </div>
    </div>
  );
}
