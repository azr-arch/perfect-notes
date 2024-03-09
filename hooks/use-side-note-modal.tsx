"use client";
import { note } from "@prisma/client";
import { create } from "zustand";

type SideNoteModalStore = {
    isOpen: boolean;
    onOpen: (noteData: note) => void;
    onClose: () => void;
    noteData?: note;
};

// Modal for viewing the note

export const useSideNoteModal = create<SideNoteModalStore>((set) => ({
    isOpen: false,
    onOpen: (noteData) => set({ isOpen: true, noteData }),
    onClose: () => set({ isOpen: false, noteData: undefined }),
}));
