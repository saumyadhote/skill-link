import Navbar from './Navbar'

export default function Layout({ children, isAuth = true }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar isAuth={isAuth} />
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  )
}
