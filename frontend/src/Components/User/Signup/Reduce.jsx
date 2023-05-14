const Reduce = (prevState, action) => {
  switch (action.type) {
    case "USERNAME":
      return {
        ...prevState,
        name: action.value,
      };
      break;

    case "EMAIL":
      return {
        ...prevState,
        email: action.value,
      };

      break;

    case "PHONENUMBER":
      return {
        ...prevState,
        phoneNumber: action.value,
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

export default Reduce;
