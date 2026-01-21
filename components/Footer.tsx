import { IDENTITY } from "@/data/identity";

export default function Footer() {
    return (
        <footer className="py-8 px-6 bg-white text-black/30 text-sm flex justify-between items-center border-t border-black/5">
            <p>&copy; {new Date().getFullYear()} {IDENTITY.name}</p>
            <p>Designed & Built by {IDENTITY.name}</p>
        </footer>
    );
}
