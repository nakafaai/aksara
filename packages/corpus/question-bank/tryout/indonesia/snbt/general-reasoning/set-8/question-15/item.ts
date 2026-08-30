import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Schlussfolgerung ist definitiv wahr." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung ist wahrscheinlich wahr.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung ist definitiv falsch.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung ist für die Angaben irrelevant.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung ist relevant, lässt sich wegen unzureichender Angaben aber nicht bewerten.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The conclusion is definitely true." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The conclusion is probably true." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The conclusion is definitely false." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The conclusion is irrelevant to the information provided.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The conclusion is relevant but cannot be evaluated because the information is insufficient.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Simpulan tersebut pasti benar." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Simpulan tersebut kemungkinan besar benar.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Simpulan tersebut pasti salah." }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Simpulan tidak relevan dengan informasi yang diberikan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Simpulan relevan, tetapi tidak dapat dinilai karena informasi tidak cukup.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
