"use client";

import { NoteAddPopover } from "@/components/note-add-popover";
import { Button } from "@/components/ui/button";
import { useNoteModal } from "@/hooks/use-note-modal";
import { PlusIcon } from "@radix-ui/react-icons";

export const Header = () => {
    const { onOpen } = useNoteModal();

    return (
        <header className="flex items-center space-x-4">
            <h1 className="text-3xl">Notes</h1>
            <Button size={"sm"} onClick={onOpen}>
                <PlusIcon className="w-4 h-4" />
            </Button>
        </header>
    );
};
