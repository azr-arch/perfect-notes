import z from "zod";
import { UpdateNoteSchema } from "./schema";

export type InputType = z.infer<typeof UpdateNoteSchema>;
