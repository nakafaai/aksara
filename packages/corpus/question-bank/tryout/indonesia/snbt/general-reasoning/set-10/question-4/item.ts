import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Schlussfolgerung ist definitiv wahr.",
        },
        {
          isCorrect: true,
          label: "Die Schlussfolgerung ist möglicherweise wahr.",
        },
        {
          isCorrect: false,
          label: "Die Schlussfolgerung ist definitiv falsch.",
        },
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung ist für die bereitgestellten Informationen irrelevant.",
        },
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung kann aufgrund unzureichender Informationen nicht beurteilt werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "The conclusion is definitely true." },
        { isCorrect: true, label: "The conclusion is possibly true." },
        { isCorrect: false, label: "The conclusion is definitely false." },
        {
          isCorrect: false,
          label: "The conclusion is irrelevant to the information provided.",
        },
        {
          isCorrect: false,
          label:
            "The conclusion cannot be assessed because the information is insufficient.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Simpulan tersebut pasti benar." },
        { isCorrect: true, label: "Simpulan tersebut mungkin benar." },
        { isCorrect: false, label: "Simpulan tersebut pasti salah." },
        {
          isCorrect: false,
          label: "Simpulan tidak relevan dengan informasi yang diberikan.",
        },
        {
          isCorrect: false,
          label: "Simpulan tidak dapat dinilai karena informasi tidak cukup.",
        },
      ],
    },
  },
};

export default item;
