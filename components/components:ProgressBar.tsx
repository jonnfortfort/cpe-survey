import React from 'react';
interface ProgressBarProps { current: number; total: number; }
const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, ((current + 1) / total) * 100));
  return (
    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-4">
      <div className="bg-sky-500 h-full transition-all duration-500 ease-out" style={{ width: `${percentage}%` }} />
    </div>
  );
};
export default ProgressBar;