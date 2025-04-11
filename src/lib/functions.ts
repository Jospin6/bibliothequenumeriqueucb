export const formatDate = (date: string) => {
  const now = new Date();
  const inputDate = new Date(date);

  const diffInMs = now.getTime() - inputDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 7) {
    return `${diffInDays || 1}d`; // "1d" si aujourd'hui, "2d", etc.
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w`;
  }

  const diffInMonths =
    now.getMonth() -
    inputDate.getMonth() +
    12 * (now.getFullYear() - inputDate.getFullYear());

  if (diffInMonths < 12) {
    return `${diffInMonths || 1}m`;
  }

  const diffInYears = now.getFullYear() - inputDate.getFullYear();
  return `${diffInYears}y`;
}

export const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: 'lightgray',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'blue',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'blue' : state.isFocused ? 'lightgray' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };