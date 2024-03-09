import { note } from "@prisma/client";
import { NoteOptions } from "./note-options";
import { NoteTitle } from "./note-title";
import { NoteItem } from "./note-item";

interface NoteListProps {
    data: note[];
}

export const NoteList = ({ data }: NoteListProps) => {
    return (
        <div className="w-full h-fit flex flex-wrap gap-4 items-start justify-start mt-8">
            {/* Separate this into own  */}
            {data.length > 0 ? data.map((item) => <NoteItem data={item} key={item.id} />) : null}
        </div>
    );
};
