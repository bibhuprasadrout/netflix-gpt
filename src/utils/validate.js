export const checkValidSignInFields = (email, password) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/.test(
      password
    );
  // Password criterias
  // At least 8 characters long
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character (e.g., !@#$%^&*())

  if (!isEmailValid) return "Not Valid. Please enter the correct credetials.*";
  if (!isPasswordValid)
    return "Not Valid. Please enter the correct credetials.*";

  return null;
};

export const checkValidSignUpFields = (
  name,
  email,
  password,
  confirmPassword
) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/.test(
      password
    );
  // Password criterias
  // At least 8 characters long
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character (e.g., !@#$%^&*())

  if (name.length < 4) return "Name needs to be atleast 4 charecters long.";
  if (!isEmailValid) return "Not Valid. Please enter a valid email.*";
  if (!isPasswordValid) return "Not Valid. Please enter a valid password.*";
  if (password != confirmPassword)
    return "Both Passwords did not match. Confirm password needs to be same as password.*";

  return null;
};
