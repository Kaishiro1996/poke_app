export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
        <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">Pokedex</h1>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
            © {new Date().getFullYear()} Pokedex
        </footer>
        </div>
    );
    }