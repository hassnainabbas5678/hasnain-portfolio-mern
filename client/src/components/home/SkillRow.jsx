import { motion } from "framer-motion";

export default function SkillRow({ name, value, active }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <div className="text-white/75">{name}</div>
        <div className="text-white/50">{value}%</div>
      </div>

      <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-2 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,229,255,0.9), rgba(124,124,255,0.9))"
          }}
          initial={{ width: 0 }}
          animate={{ width: active ? `${value}%` : 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
