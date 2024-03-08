"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Delete, MoreVertical, Trash2, XCircle } from "lucide-react";
import { handler as deleteNoteHandler } from "@/actions/delete-note";
import { toast } from "@/components/ui/use-toast";

interface NoteOptionsProps {
    id: string;
}

export const NoteOptions = ({ id }: NoteOptionsProps) => {
    const onDelete = async () => {
        try {
            await deleteNoteHandler({ id });
            toast({
                title: "Note Deleted.",
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Error while Deleting.",
                variant: "destructive",
            });
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild className="absolute right-0 top-0.5">
                <Button size="sm" variant={"transparent"} className="w-auto h-auto p-1">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-fit ">
                <Button
                    size="sm"
                    className="text-rose-500 hover:text-rose-500 hover:bg-rose-500/10"
                    variant={"ghost"}
                    onClick={onDelete}
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
};
