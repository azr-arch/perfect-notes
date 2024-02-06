import { db } from "@/lib/db";
import { Header } from "./_components/header";
import { NoteList } from "./_components/note-list";

export default async function Home() {
    const notes = await db.note.findMany();

    return (
        <main className="w-full h-full bg-pink-700 py-8 px-6">
            <Header />
            <NoteList data={notes} />
        </main>
    );
}
