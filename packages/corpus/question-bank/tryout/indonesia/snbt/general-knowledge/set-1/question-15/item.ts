import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "das Frostphänomen." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "die Grasfläche." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "hohes Plateau." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "der Frost." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "noch vorhanden." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "dew phenomenon." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "expanse of grass." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "high plateau." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "frost." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "still located." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "fenomena embun." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "hamparan rumput." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "dataran tinggi." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "embun es." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "masih berada." }],
        },
      ],
    },
  },
};

export default item;
