import z from "zod";
import { CreateNoteSchema } from "./schema";

export type InputType = z.infer<typeof CreateNoteSchema>;
