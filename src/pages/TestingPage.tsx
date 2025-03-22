import { useNavigate } from "react-router-dom"

export default function TestingPage() {
  const navigate = useNavigate()
  return (
    <main className="bg-black w-screen h-screen grid place-items-center">
      <section className="text-center">
        <h1 className="text-white">Testing Page</h1>
        <p className="text-white">This is the testing page</p>
        <button
          className="text-black bg-white rounded hover:bg-red-950 hover:text-white m-2 p-2"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </section>
    </main>
  )
}
