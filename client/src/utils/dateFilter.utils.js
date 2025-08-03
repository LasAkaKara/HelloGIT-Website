import { isSameDay, isThisWeek, isThisMonth, addWeeks, isSameWeek, isSameMonth, addMonths } from 'date-fns';

export function matchesDateFilter(date, filter) {
  if (!date) return false;
  
  const now = new Date();
  const targetDate = new Date(date);
  
  // Helper function to get start of week (Monday)
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };
  
  // Helper function to get end of week (Sunday)
  const getEndOfWeek = (date) => {
    const startOfWeek = getStartOfWeek(date);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return endOfWeek;
  };

  switch (filter) {
    case 'Today':
      return isSameDay(targetDate, now);
      
    case 'This week':
      const startOfWeek = getStartOfWeek(now);
      const endOfWeek = getEndOfWeek(now);
      return targetDate >= startOfWeek && targetDate <= endOfWeek;
      
    case 'This month':
      return isThisMonth(targetDate) && targetDate.getFullYear() === now.getFullYear();
      
    case 'Next week': {
      const nextWeekStart = addWeeks(getStartOfWeek(now), 1);
      const nextWeekEnd = getEndOfWeek(nextWeekStart);
      return targetDate >= nextWeekStart && targetDate <= nextWeekEnd;
    }
      
    case 'Next month': {
      const nextMonth = addMonths(new Date(now.getFullYear(), now.getMonth(), 1), 1);
      return targetDate.getMonth() === nextMonth.getMonth() && 
             targetDate.getFullYear() === nextMonth.getFullYear();
    }
      
    case 'Any day':
    default:
      return true;
  }
}
