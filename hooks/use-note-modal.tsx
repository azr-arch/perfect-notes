"use client";

import { create } from "zustand";

type NoteModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useNoteModal = create<NoteModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
