import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Stickstoff und Phosphor schädigen Auenböden immer",
      value: false,
    },
    {
      label: "Auen können Material nur abgeben und niemals zurückhalten",
      value: false,
    },
    {
      label: "Auen können Sedimente und Nährstoffe zurückhalten",
      value: true,
    },
    {
      label:
        "In Auen sammelt sich Material nur an und geht durch Erosion nie verloren",
      value: false,
    },
    {
      label: "Jede Überschwemmung macht jeden Auenboden fruchtbarer",
      value: false,
    },
  ],
};

export default choices;
