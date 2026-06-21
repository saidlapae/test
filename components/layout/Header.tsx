import { Coffee } from "lucide-react";
export default function Header() {
  return (
    <header className="h-16 flex-shrink-0 bg-primary border-b border-neutral-800 flex items-center px-6">
      <Coffee className="w-6 h-6 text-accent mr-3" />
      <h1 className="text-lg text-neutral-100">
        SPK Pemilihan Saset Kopi Terbaik
      </h1>
    </header>
  );
}
