import userModel from "../models/userModel"
import validator from 'validator'

// Signup Validatos

const validateSignupEmail = (email: string) => {
  if (!email) {
    return 'Email is required';
  } else if (!validator.isEmail(email)) {
    return 'Email is not valid';
  }
  return null;
};

const validateSignupPassword = (password: string) => {
  if (!password) {
    return 'Password is required';
  } else if (!validator.isStrongPassword(password)) {
    return 'Password is not strong enough';
  }
  return null;
};

const validateSignupUser = async (email: string) => {
const emailExists = await userModel.findOne({ email: email });
  if (emailExists) {
    return 'Email already exists';
  }
  return null;
};

// Login Validators
const validateLoginEmail = async (email: string) => {
const emailExists = await userModel.findOne({ email: email });
  if (!emailExists) {
    return 'Invalid Login Credentials';
  }
  return null;
};


export const validateSignUp = async (email: string, password: string) => {
const errors = [];

const emailError = validateSignupEmail(email);
  if (emailError) {
    errors.push(emailError);
  }

const passwordError = validateSignupPassword(password);
  if (passwordError) {
    errors.push(passwordError);
  }

const userError = await validateSignupUser(email);
  if (userError) {
    errors.push(userError);
  }

  return errors;
};

export const validateLogin = async (email: string, password: string) => {
const errors = [];

const userError = await validateLoginEmail(email);
  if (userError) {
    errors.push(userError);
  }

  return errors;
};