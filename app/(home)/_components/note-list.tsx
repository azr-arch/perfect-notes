import { note } from "@prisma/client";
import { NoteOptions } from "./note-options";
import { NoteTitle } from "./note-title";

interface NoteListProps {
    data: note[];
}

export const NoteList = ({ data }: NoteListProps) => {
    return (
        <div className="w-full h-fit flex flex-wrap gap-4 items-start justify-start mt-8">
            {/* Separate this into own  */}
            {data.length > 0
                ? data.map((item) => (
                      <div
                          key={item.id}
                          className="bg-pink-200 rounded-lg w-auto min-w-[150px] max-w-[250px] shadow-md p-4 text-black flex flex-col gap-2"
                      >
                          <div className="relative">
                              <NoteTitle data={item} />
                              <NoteOptions id={item.id} />
                          </div>
                          <p className="text-sm font-medium overflow-ellipsis">
                              {item.description}
                          </p>
                      </div>
                  ))
                : null}
        </div>
    );
};
