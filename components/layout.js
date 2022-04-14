export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <footer className="center mt-5 flex justify-center space-x-4 bg-[#E7E8EF] p-4 text-xs">
        <p>Powered by Next.js, Swell, and Vercel </p>
        <span>|</span>
        <a
          href="https://github.com/Nutlope/swell-nextjs-demo"
          className="font-medium text-orange-600"
        >
          Source code
        </a>
      </footer>
    </>
  )
}
