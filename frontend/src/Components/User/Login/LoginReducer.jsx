const Reducer = (prevState, action) => {
  switch (action.type) {
    case "EMAIL":
      return {
        ...prevState,
        email: action.value,
      };

      break;

    case "PASSWORD":
      return {
        ...prevState,
        password: action.value,
      };

      break;
    default:
      prevState;
      break;
  }
};

export default Reducer;
