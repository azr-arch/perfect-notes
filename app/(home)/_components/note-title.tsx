"use client";

import { note } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { NoteOptions } from "./note-options";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateNote } from "@/actions/update-note";
import { useFormStatus } from "react-dom";
import { toast } from "@/components/ui/use-toast";

interface NoteTitleProps {
    data: note;
}

export const NoteTitle = ({ data }: NoteTitleProps) => {
    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    const { pending } = useFormStatus();

    const { execute, fieldErrors, isLoading } = useAction(updateNote, {
        onSuccess: (data) => {
            setTitle(data.title);
            disableEditing();
            toast({
                title: `Renamed successfully.`,
            });
        },
        onError: (error) => {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Error occured, try again later.",
            });
        },
    });

    const enableEditing = () => {
        setIsEditing(true);

        setTimeout(() => {
            inputRef?.current?.focus();
        }, 0);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onSubmit = async (formData: FormData) => {
        const newTitle = formData.get("title") as string;
        const id = formData.get("id") as string;

        execute({ id, title: newTitle });
    };

    const onBlur = () => {
        formRef?.current?.requestSubmit();
    };

    const handleKeys = (e: KeyboardEvent) => {
        switch (e.key) {
            case "Escape":
                disableEditing();
                break;

            case "Enter":
                formRef.current?.requestSubmit();
                break;

            default:
                return null;
        }
    };

    if (isEditing) {
        return (
            <form
                action={onSubmit}
                // @ts-ignore
                onKeyDown={handleKeys}
                ref={formRef}
                className="w-[85%]"
                onBlur={onBlur}
            >
                <input name="id" readOnly hidden value={data.id} />
                <Input
                    disabled={isLoading || pending}
                    name="title"
                    ref={inputRef}
                    defaultValue={data.title}
                />
            </form>
        );
    }

    return (
        <div
            onDoubleClick={enableEditing}
            className="font-bold text-xl pr-6 cursor-pointer h-auto w-auto"
        >
            {title}
        </div>
    );
};
