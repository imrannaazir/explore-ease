import { z } from 'zod';

const signUpValidator = z.object({
  body: z.object({
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});
const signInValidator = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const verifyAccountValidator = z.object({
  body: z.object({
    token: z.string(),
  }),
});

const AuthValidations = {
  signUpValidator,
  signInValidator,
  verifyAccountValidator,
};
export default AuthValidations;
