import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Schlussfolgerung ist mit Sicherheit wahr.",
        },
        {
          isCorrect: false,
          label: "Die Schlussfolgerung ist wahrscheinlich wahr.",
        },
        {
          isCorrect: false,
          label: "Die Schlussfolgerung ist für die Angaben irrelevant.",
        },
        {
          isCorrect: true,
          label: "Die Schlussfolgerung ist mit Sicherheit falsch.",
        },
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung lässt sich wegen unzureichender Angaben nicht bewerten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The conclusion is definitely true.",
        },
        {
          isCorrect: false,
          label: "The conclusion is probably true.",
        },
        {
          isCorrect: false,
          label: "The conclusion is irrelevant to the information provided.",
        },
        {
          isCorrect: true,
          label: "The conclusion is definitely false.",
        },
        {
          isCorrect: false,
          label:
            "The conclusion cannot be assessed because there is insufficient information.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Simpulan tersebut pasti benar.",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut mungkin benar.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan tersebut tidak relevan dengan informasi yang diberikan.",
        },
        {
          isCorrect: true,
          label: "Simpulan tersebut pasti salah.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan tersebut tidak dapat dinilai karena informasi tidak cukup.",
        },
      ],
    },
  },
};

export default item;
