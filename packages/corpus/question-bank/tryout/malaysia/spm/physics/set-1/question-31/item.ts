import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The same",
        },
        {
          correct: true,
          label: "Twice as large",
        },
        {
          correct: false,
          label: "Half as large",
        },
        {
          correct: false,
          label: "Four times as large",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sama",
        },
        {
          correct: true,
          label: "Dua kali ganda",
        },
        {
          correct: false,
          label: "Separuh",
        },
        {
          correct: false,
          label: "Empat kali ganda",
        },
      ],
    },
  },
};

export default item;
