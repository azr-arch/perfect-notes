"use client";

import { useNoteModal } from "@/hooks/use-note-modal";
import { Dialog, DialogContent } from "./ui/dialog";

export const NoteModal = () => {
    const { isOpen, onClose } = useNoteModal();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black">
                <div className="space-y-4 ">
                    <h3>This is title</h3>
                    <p>Note description here</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};
