"use client";

import { useNewNoteModal } from "@/hooks/use-new-note-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ElementRef, FormEvent, useRef } from "react";
import { createNote, handler } from "@/actions/create-note";
import { useFormStatus } from "react-dom";
import { useAction } from "@/hooks/use-action";
import { toast } from "./ui/use-toast";

export const NoteModal = () => {
    // Todo complete this
    const formRef = useRef<HTMLFormElement | null>(null);
    const { isOpen, onClose } = useNewNoteModal();

    const { execute, isLoading } = useAction(createNote, {
        onSuccess: (data) => {
            toast({
                title: "Note created.",
            });
        },
        onError: (error) => {
            console.log(error);
            toast({ variant: "destructive", title: "Error occured while creating note." });
        },
        onComplete: () => {
            onClose();
        },
    });

    const onSubmit = async (data: FormData) => {
        const title = data.get("title") as string;
        const description = data.get("description") as string;

        if (!title || !description) return;

        execute({ title, description });
    };

    const handleKeys = (e: KeyboardEvent) => {
        // Submit the form on Shift + Enter
        if (e.keyCode === 13 && e.shiftKey) {
            formRef.current?.requestSubmit();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[80%] aspect-video">
                <form
                    ref={formRef}
                    // @ts-ignore
                    onKeyDown={handleKeys}
                    action={onSubmit}
                    className="space-y-2 text-black  flex flex-col"
                >
                    <Input
                        name="title"
                        disabled={isLoading}
                        className="text-4xl  font-bold focus-visible:ring-0 border-0 shadow-none placeholder:opacity-50"
                        placeholder="Untitled"
                    />
                    <Textarea
                        name="description"
                        disabled={isLoading}
                        className="resize-none shadow-none border-0 flex-grow focus-visible:ring-0"
                        placeholder="Enter you note here..."
                    />
                </form>
            </DialogContent>
        </Dialog>
    );
};
