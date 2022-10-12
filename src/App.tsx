import {useState} from "react";

import api, {type Band} from "./api";

function App() {
  const [bands, setBands] = useState<Map<Band["name"], Band>>(() => api.list(30));
  const [errors, setErrors] = useState<number>(0);

  function handleClick(name: Band["name"]) {
    const draft: Map<Band["name"], Band> = structuredClone(bands);
    const band = draft.get(name)!;

    if (band.valid) {
      band.status = "correct";

      const isCompleted = !Array.from(draft.values()).some(
        (band) => band.valid && band.status !== "correct",
      );

      if (isCompleted) {
        alert(`Felicitaciones, completaste el juego. Te equivocaste ${errors} veces.`);

        setBands(api.list(30));
        setErrors(0);
      } else {
        setBands(draft);
      }
    } else {
      band.status = "incorrect";

      setBands(draft);
      setErrors((errors) => errors + 1);
    }
  }

  return (
    <main>
      <h1>Lollapalooncy</h1>
      <ul>
        {Array.from(bands.values()).map((band: Band) => {
          return (
            <li
              key={band.name}
              style={{
                color:
                  band.status === "correct"
                    ? "green"
                    : band.status === "incorrect"
                    ? "red"
                    : "inherit",
              }}
              onClick={() => handleClick(band.name)}
            >
              {band.name}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;