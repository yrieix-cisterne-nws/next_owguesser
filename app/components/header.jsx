import Link from "next/link";

export default function Header() {
    
  return (
    <header className="bg-[#405275]">
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex gap-4">
                {/* <button className="px-6 py-2 text-white bg-[#43484C]">
                    Home
                </button> */}
                <Link href="/" className="px-6 py-2 text-white bg-[#43484c]"> Hero </Link>
                {/* <button className="px-6 py-2 text-white bg-[#43484C]">
                    Stadium
                </button> */}
            </div>
        </div>
    </header>
  );
}