// Filter events composable for Vue 2
import { matchesDateFilter } from "../utils/dateFilter.utils.js";

export function filteredEvents({
  events,
  searchQuery,
  selectedTypeFilter,
  selectedOrganizerFilter,
  selectedDateFilter,
  sortByDate,
}) {
  let filtered = events || [];

  // Filter by search query
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((event) =>
      event.title.toLowerCase().includes(q)
    );
  }

  // Filter by type (using status field)
  if (selectedTypeFilter && selectedTypeFilter !== "Any type") {
    filtered = filtered.filter((event) => event.status === selectedTypeFilter);
  }

  // Filter by organizer (skip for now as we don't have organizer field)
  if (selectedOrganizerFilter && selectedOrganizerFilter !== "Any organizer") {
    filtered = filtered.filter(
      (event) => event.organizer === selectedOrganizerFilter
    );
  }

  // Filter by date
  if (selectedDateFilter && selectedDateFilter !== "Any day") {
    filtered = filtered.filter((event) =>
      matchesDateFilter(event.dateStart, selectedDateFilter)
    );
  }

  // Sort by date if enabled
  if (sortByDate) {
    filtered = [...filtered].sort(
      (a, b) =>
        new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );
  }

  return filtered;
}
