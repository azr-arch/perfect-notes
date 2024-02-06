import z from "zod";
import { DeleteNoteSchema } from "./schema";

export type InputType = z.infer<typeof DeleteNoteSchema>;
