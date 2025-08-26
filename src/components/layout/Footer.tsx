export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-sego  backdrop-blur-md border-t border-sora-secondary/20">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between text-sm">
        <div className="text-gray-800 text-sm">© 2025 AitherLabs</div>
        <div className="flex gap-6 text-sm">
          <a
            href="/privacy"
            className="text-gray-700 hover:text-sora-primary transition-colors"
          >
            privacy
          </a>
          <a
            href="/terms"
            className="text-gray-700 hover:text-sora-secondary transition-colors"
          >
            terms
          </a>
         
        </div>
      </div>
    </footer>
  );
}
