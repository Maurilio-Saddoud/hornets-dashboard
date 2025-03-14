import { HORNETS_COLORS } from '@/constants/dashboardConstants';

export function HornetsSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
        <div 
          className="w-12 h-12 rounded-full border-t-4 border-b-4 absolute top-0 left-0 animate-spin"
          style={{ 
            borderTopColor: HORNETS_COLORS.TEAL,
            borderBottomColor: HORNETS_COLORS.PURPLE
          }}
        ></div>
      </div>
    </div>
  );
} 