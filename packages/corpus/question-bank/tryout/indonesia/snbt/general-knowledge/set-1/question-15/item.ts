import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "das Frostphänomen.",
        },
        {
          isCorrect: false,
          label: "die Grasfläche.",
        },
        {
          isCorrect: false,
          label: "der Frost.",
        },
        {
          isCorrect: false,
          label: "noch vorhanden.",
        },
        {
          isCorrect: true,
          label: "hohes Plateau.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "dew phenomenon.",
        },
        {
          isCorrect: false,
          label: "expanse of grass.",
        },
        {
          isCorrect: false,
          label: "frost.",
        },
        {
          isCorrect: false,
          label: "still located.",
        },
        {
          isCorrect: true,
          label: "high plateau.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "fenomena embun.",
        },
        {
          isCorrect: false,
          label: "hamparan rumput.",
        },
        {
          isCorrect: false,
          label: "embun es.",
        },
        {
          isCorrect: false,
          label: "masih berada.",
        },
        {
          isCorrect: true,
          label: "dataran tinggi.",
        },
      ],
    },
  },
};

export default item;
