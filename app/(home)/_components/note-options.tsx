"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Delete, MoreVertical, XCircle } from "lucide-react";
import { handler as deleteNoteHandler } from "@/actions/delete-note";

interface NoteOptionsProps {
    id: string;
}

export const NoteOptions = ({ id }: NoteOptionsProps) => {
    const onDelete = async () => {
        try {
            //  Use something like fetch query for loading error states!!!

            await deleteNoteHandler({ id });
        } catch (error) {
            console.log(error);
            // Maybe notify user that an error occured!!!
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild className="absolute right-0 top-0.5">
                <Button size="sm" variant={"transparent"} className="w-auto h-auto p-1">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit ">
                <Button
                    size="sm"
                    className="text-rose-500 hover:text-rose-500 hover:bg-rose-500/10"
                    variant={"ghost"}
                    onClick={onDelete}
                >
                    <Delete className="w-4 h-4 mr-2" />
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
};
