import {z} from 'zod';
import {avatarSchema, emailSchema, nameSchema, passwordSchema} from './user.model.js';

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

export const signupSchema = z.intersection(loginSchema, z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    avatar: avatarSchema
}));

export type Login = z.infer<typeof loginSchema>;
export type Signup = z.infer<typeof signupSchema>;
