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
          isCorrect: true,
          label: "hohes Plateau.",
        },
        {
          isCorrect: false,
          label: "der Frost.",
        },
        {
          isCorrect: false,
          label: "noch vorhanden.",
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
          isCorrect: true,
          label: "high plateau.",
        },
        {
          isCorrect: false,
          label: "frost.",
        },
        {
          isCorrect: false,
          label: "still located.",
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
          isCorrect: true,
          label: "dataran tinggi.",
        },
        {
          isCorrect: false,
          label: "embun es.",
        },
        {
          isCorrect: false,
          label: "masih berada.",
        },
      ],
    },
  },
};

export default item;
