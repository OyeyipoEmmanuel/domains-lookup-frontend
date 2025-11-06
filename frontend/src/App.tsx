import Action from "./pages/action/Action"

const App = () => {
  return (
    <main className="bg-[#F5F8FB] min-h-screen w-full">
      <header className="py-6">
        <h1 className="text-center text-2xl font-semibold mb-5">Domain Lookup - web</h1>
        <section className="text-center flex flex-col space-y-1">
          <h1>CLI Built by <a href="https://github.com/akinloluwami/domains-lookup" target="_blank" className="text-purple-800  underline">Akinkunmi | Titanium</a></h1>
          <h1>Web Built by <a href="https://github.com/OyeyipoEmmanuel/domains-lookup-frontend" target="_blank" className="text-purple-800 underline">me, Emmanuel</a></h1>
        </section>
      </header>

      <section className="px-2">
        <Action/>
      </section>
    </main>
  )
}

export default App
