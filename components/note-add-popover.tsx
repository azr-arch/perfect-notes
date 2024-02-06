"use client";

import { useFormStatus } from "react-dom";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "./ui/popover";
import { Button } from "./ui/button";
import { ElementRef, useRef } from "react";
import { X } from "lucide-react";
import { handler } from "@/actions/create-note";

interface NoteAddPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const NoteAddPopover = ({ children, side, sideOffset, align }: NoteAddPopoverProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);

    const onSubmit = async (data: FormData) => {
        const title = data.get("title") as string;
        const description = data.get("description") as string;

        const res = await handler({ title, description });

        closeRef?.current?.click();
    };

    // Separate this logic from here
    // Maybe in input component
    const { pending } = useFormStatus();

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                side={side}
                align={align}
                sideOffset={sideOffset}
                className="w-[500px] h-auto"
            >
                <PopoverClose asChild ref={closeRef}>
                    <Button className="h-auto w-auto absolute p-2 top-2 right-2 text-neutral-400">
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>

                {/* Separate this concern */}
                <form action={onSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Title</p>
                            <Input
                                disabled={pending}
                                type="text"
                                name="title"
                                className="px-2 py-1"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Description</p>
                            <Input
                                disabled={pending}
                                type="text"
                                name="description"
                                className="px-2 py-1"
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={pending}>
                        Submit
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
};
