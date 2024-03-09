"use client";

import { useSideNoteModal } from "@/hooks/use-side-note-modal";
import { useEffect, useMemo, useRef, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UpdateNoteSchema } from "@/actions/update-note/schema";

import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { SheetFooter } from "./ui/sheet";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { useAction } from "@/hooks/use-action";
import { updateNote } from "@/actions/update-note";
import { toast } from "./ui/use-toast";

export const SideNoteModal = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const { isOpen, onClose, noteData } = useSideNoteModal();
    const { execute, isLoading } = useAction(updateNote, {
        onSuccess: (data) => {
            toast({
                title: "Note updated successfully.",
            });
        },
        onError: () => {},
        onComplete: () => {
            onClose();
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const id = formData.get("id") as string;

        if (title === noteData?.title && description === noteData?.description) {
            // Todo Implement this, so that when user has made any changes then and only then they can perform save button
            toast({
                title: "Make some changes to save file",
            });

            return;
        }

        execute({ title, description, id });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side={"right"} className="space-y-4 text-black">
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="space-y-4 py-0.5 px-1 m-1 flex flex-col w-full h-full text-black"
                >
                    <input type="hidden" name="id" value={noteData?.id} />

                    <Input
                        name="title"
                        disabled={isLoading}
                        className="text-2xl h-auto py-1.5 font-bold focus-visible:ring-0 border-0 shadow-none placeholder:opacity-50"
                        defaultValue={noteData?.title}
                    />
                    <Textarea
                        name="description"
                        disabled={isLoading}
                        className="resize-none font-medium  shadow-none border-0 flex-grow focus-visible:ring-0"
                        defaultValue={noteData?.description || ""}
                    />

                    <div className="flex items-center gap-x-1">
                        <Button>Save</Button>

                        <Button type="button" variant={"outline"} onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
};
