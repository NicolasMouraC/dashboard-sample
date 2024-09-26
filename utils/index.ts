export const buildDashboardFiltersQuery = (filters: {
  employee: string;
  lastLogin: Date | null;
  department: string;
  isActive: string | null;
}) => {
  let query = "";

  if (filters.employee) {
    query += `&employee=${filters.employee}`;
  }
  if (filters.lastLogin) {
    query += `&lastLogin=${filters.lastLogin.toISOString()}`;
  }
  if (filters.department) {
    query += `&department=${filters.department}`;
  }
  if (filters.isActive) {
    query += `&isActive=${filters.isActive}`;
  }

  return query;
};

export const formatDateToLongMonthDayYear = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
};

export const calculateTimeElapsedFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const differenceInMilliseconds = now.getTime() - date.getTime();

  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays <= 30) {
    return `${differenceInDays} days ago`;
  } else if (differenceInDays <= 365) {
    const months = Math.floor(differenceInDays / 30);
    return `${months} months ago`;
  } else {
    const years = Math.floor(differenceInDays / 365);
    return `${years} years ago`;
  }
};
