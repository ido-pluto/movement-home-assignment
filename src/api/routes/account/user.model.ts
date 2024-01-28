import {z} from 'zod';
import mongoose from 'mongoose';

export const userIdParam = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), 'Invalid ObjectId')
});

export const pageNumberParam = z.object({
    page: z.coerce.number().int().min(0)
});

export const emailSchema = z.string().email().max(30);
export const passwordSchema = z.string().min(6).max(12);
export const nameSchema = z.string().min(2).max(10);
export const avatarSchema = z.string().url().max(100);

export const userGeneralInfoSchema = z.object({
    email: emailSchema,
    firstName: nameSchema,
    lastName: nameSchema,
    avatar: avatarSchema
});

export const updatePasswordSchema = z.object({
    oldPassword: passwordSchema,
    password: passwordSchema
});

export type UserGeneralInfo = z.infer<typeof userGeneralInfoSchema>;
export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
