import { FieldErrors } from "@/lib/create-safe-action";

interface FormErrorProps {
    errors: FieldErrors<Record<string, any>>;
}

export const FormError = ({ errors }: FormErrorProps) => {
    if (!errors) {
        return null;
    }

    return (
        <div className="space-y-1">
            <p className="text-rose-400">{errors}</p>
        </div>
    );
};
