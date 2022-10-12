import DATA from "./dataset.json";

export type Band = {
  name: string;
  valid: boolean;
  status: "pristine" | "incorrect" | "correct";
};

const api = {
  list: (limit: number): Map<Band["name"], Band> => {
    const matches: Band[] = [...DATA]
      .sort(() => (Math.random() > 0.5 ? -1 : 1))
      .slice(0, limit)
      .map((band) => ({...band, status: "pristine"}));

    const bands = new Map<Band["name"], Band>();

    for (let match of matches) {
      bands.set(match.name, match);
    }

    return bands;
  },
};

export default api;
