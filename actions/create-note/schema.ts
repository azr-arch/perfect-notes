import { z } from "zod";

export const CreateNoteSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title is required",
        })
        .min(3, {
            message: "Title is too short",
        }),
    description: z.string({
        required_error: "Description is requried",
        invalid_type_error: "Description is requried",
    }),
});
