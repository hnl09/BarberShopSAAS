import userModel from "../models/userModel"
import validator from 'validator'

    const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    } else if (!validator.isEmail(email)) {
      return 'Email is not valid';
    }
    return null;
  };
  
    const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    } else if (!validator.isStrongPassword(password)) {
      return 'Password is not strong enough';
    }
    return null;
  };
  
    const validateUser = async (email: string) => {
    const emailExists = await userModel.findOne({ email: email });
    if (emailExists) {
      return 'Email already exists';
    }
    return null;
  };
  
  export const validateSignUp = async (email: string, password: string) => {
    const errors = [];
  
    const emailError = validateEmail(email);
    if (emailError) {
      errors.push(emailError);
    }
  
    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.push(passwordError);
    }
  
    const userError = await validateUser(email);
    if (userError) {
      errors.push(userError);
    }
  
    return errors;
  };