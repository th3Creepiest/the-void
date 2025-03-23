import { useEffect, useState } from "react"

export default function ShootEmUp() {
  const [myHTML, setMyHTML] = useState("")

  useEffect(() => {
    fetch("/src/shootemup/index.html")
      .then((response) => response.text())
      .then((data) => {
        setMyHTML(data);
        const script = document.createElement("script");
        script.src = "/src/shootemup/game.js";
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      })
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: myHTML }} />
}
