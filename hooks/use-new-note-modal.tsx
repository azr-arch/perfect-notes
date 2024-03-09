"use client";

import { create } from "zustand";

type NoteModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

// Modal for adding a note
export const useNewNoteModal = create<NoteModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
