export function goToPage({ events, itemsPerPage, targetPage, totalPages }) {
  let paginatedEvents = events || [];

  if (targetPage >= 1 && targetPage <= totalPages) {
    const start = (targetPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    paginatedEvents = paginatedEvents.slice(start, end);
  } else {
    console.log("Cant paginate");
  }

  return paginatedEvents;
}
