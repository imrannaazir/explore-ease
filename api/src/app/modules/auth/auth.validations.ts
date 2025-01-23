import { z } from 'zod';

const signUpValidator = z.object({
  body: z.object({
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});

const AuthValidations = { signUpValidator };
export default AuthValidations;
