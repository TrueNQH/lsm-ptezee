export default function Footer() {
  return (
    <footer className="border-t py-8 text-sm text-gray-600 dark:text-gray-300">
      <div className="container flex flex-wrap items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} DLA - PTEZEE</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  )
}