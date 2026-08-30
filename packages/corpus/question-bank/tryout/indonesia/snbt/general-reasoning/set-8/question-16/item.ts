import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Schlussfolgerung ist relevant, lässt sich wegen unzureichender Angaben aber nicht beurteilen.",
        },
        {
          isCorrect: false,
          label: "Die Schlussfolgerung ist definitiv wahr.",
        },
        {
          isCorrect: false,
          label: "Die Schlussfolgerung ist wahrscheinlich wahr.",
        },
        {
          isCorrect: false,
          label: "Die Schlussfolgerung ist definitiv falsch.",
        },
        {
          isCorrect: false,
          label: "Die Schlussfolgerung ist für die Angaben irrelevant.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The conclusion is relevant but cannot be assessed because the information is insufficient.",
        },
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
          label: "The conclusion is definitely false.",
        },
        {
          isCorrect: false,
          label: "The conclusion is irrelevant to the given information.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Simpulan relevan, tetapi tidak dapat dinilai karena informasi tidak cukup.",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut pasti benar.",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut kemungkinan besar benar.",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut pasti salah.",
        },
        {
          isCorrect: false,
          label: "Simpulan tidak relevan dengan informasi yang diberikan.",
        },
      ],
    },
  },
};

export default item;
