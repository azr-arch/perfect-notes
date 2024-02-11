import { z } from "zod";
export type FieldErrors<T> = {
    [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
};

// This is for validating data using zod, before proceding further server calls

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const validatedData = schema.safeParse(data);

        if (!validatedData.success) {
            return {
                fieldErrors: validatedData.error.flatten() as FieldErrors<TInput>,
            };
        }

        return handler(validatedData.data);
    };
};
