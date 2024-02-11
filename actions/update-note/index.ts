"use server";

import { db } from "@/lib/db";
import { InputType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateNoteSchema } from "./schema";

export const handler = async (data: InputType) => {
    const { id, ...values } = data;

    let updatedNote;

    try {
        updatedNote = await db.note.update({
            where: {
                id,
            },
            data: {
                ...values,
            },
        });
    } catch (e) {
        console.log("ERROR: ", e);
        return {
            errors: "Failed to update",
        };
    }

    revalidatePath("/");

    return {
        data: updatedNote,
    };
};

export const updateNote = createSafeAction(UpdateNoteSchema, handler);
