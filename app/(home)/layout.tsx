import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/providers/modal-provider";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-screen-2xl h-full mx-auto">
            <ModalProvider />
            {children}
        </div>
    );
}
