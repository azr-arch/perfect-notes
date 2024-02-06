"use server";

import { db } from "@/lib/db";
import { InputType } from "./types";
import { revalidatePath } from "next/cache";

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
            errors: e,
        };
    }

    revalidatePath("/");

    return {
        data: newNote,
    };
};
