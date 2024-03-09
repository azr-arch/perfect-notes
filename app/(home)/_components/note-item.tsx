"use client";

import { note } from "@prisma/client";
import { NoteOptions } from "./note-options";
import { NoteTitle } from "./note-title";
import { useSideNoteModal } from "@/hooks/use-side-note-modal";

interface NoteItemProps {
    data: note;
}

export const NoteItem = ({ data }: NoteItemProps) => {
    const { onOpen } = useSideNoteModal();

    return (
        <div
            onClick={() => onOpen(data)}
            key={data.id}
            className="bg-pink-200 cursor-pointer rounded-lg w-auto min-w-[150px] max-w-[250px] shadow-md p-4 text-black flex flex-col gap-2"
        >
            <div className="flex items-center gap-1">
                <NoteTitle data={data} />
                <NoteOptions id={data.id} />
            </div>
            <p className="text-sm font-medium overflow-ellipsis">{data.description}</p>
        </div>
    );
};
