import { db } from "@/lib/db";
import { Header } from "./_components/header";
import { NoteList } from "./_components/note-list";
import { NoteModal } from "@/components/new-note-modal";
import { SideNoteModal } from "@/components/side-note-modal";

export default async function Home() {
    const notes = await db.note.findMany();

    return (
        <main className="w-full h-full bg-pink-700 py-8 px-6">
            <Header />

            <div className="">
                <NoteList data={notes} />
            </div>

            {/* Add New Note Modal */}
            <NoteModal />
        </main>
    );
}
