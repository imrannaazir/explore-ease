import { signInValidator, signUpValidator } from "@/schemas";
import { z } from "zod";

export type TSignUpProps = z.infer<typeof signUpValidator>;
export type TSignInProps = z.infer<typeof signInValidator>;
