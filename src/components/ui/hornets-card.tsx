import { HORNETS_COLORS } from '@/constants/dashboardConstants';

interface HornetsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function HornetsCard({ title, children, className = '' }: HornetsCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-3" style={{ 
        background: `linear-gradient(to right, ${HORNETS_COLORS.TEAL}, ${HORNETS_COLORS.PURPLE})` 
      }}>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
} 