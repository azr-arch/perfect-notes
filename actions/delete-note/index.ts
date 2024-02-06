"use server";

import { db } from "@/lib/db";
import { InputType } from "./types";
import { revalidatePath } from "next/cache";

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
            errors: e,
        };
    }

    revalidatePath("/");
};
