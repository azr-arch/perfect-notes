"use server";

import { db } from "@/lib/db";
import { InputType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteNoteSchema } from "./schema";

export const handler = async (data: InputType) => {
    const { id } = data;

    try {
        await db.note.delete({
            where: {
                id,
            },
        });
    } catch (e) {
        console.log("ERROR: ", e);
        return {
            errors: "Failed to delete.",
        };
    }

    revalidatePath("/");
};

export const deleteNote = createSafeAction(DeleteNoteSchema, handler);
