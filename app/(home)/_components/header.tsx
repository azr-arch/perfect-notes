"use client";

import { Button } from "@/components/ui/button";
import { useNewNoteModal } from "@/hooks/use-new-note-modal";
import { PlusIcon } from "@radix-ui/react-icons";

export const Header = () => {
    const { onOpen } = useNewNoteModal();

    return (
        <header className="flex items-center space-x-4">
            <h1 className="text-3xl">Notes</h1>
            <Button size={"sm"} onClick={onOpen}>
                <PlusIcon className="w-4 h-4" />
            </Button>
        </header>
    );
};
