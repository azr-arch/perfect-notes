"use server";

import { db } from "@/lib/db";
import { InputType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateNoteSchema } from "./schema";

export const handler = async (data: InputType) => {
    const { title, description } = data;

    let newNote;

    try {
        newNote = await db.note.create({
            data: {
                title,
                description,
            },
        });
    } catch (e) {
        console.log("ERROR: ", e);
        return {
            errors: "Failed to create.",
        };
    }

    revalidatePath("/");

    return {
        data: newNote,
    };
};

export const createNote = createSafeAction(CreateNoteSchema, handler);
