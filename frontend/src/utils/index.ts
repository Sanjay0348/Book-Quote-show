export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString));
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getRandomColor = (): string => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-yellow-100 text-yellow-800',
    'bg-indigo-100 text-indigo-800',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};