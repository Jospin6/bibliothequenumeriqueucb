export const formatDate = (date: string) => {
    const options = { year: "numeric" as "numeric", month: "long" as "long", day: "numeric" as "numeric" };
    return new Date(date).toLocaleDateString('fr-FR', options);
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