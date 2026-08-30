import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung ist mit Sicherheit wahr.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung ist möglicherweise wahr.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Schlussfolgerung ist mit Sicherheit falsch.",
            },
          ],
        },
        {
          isCorrect: false,
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
              text: "Die Schlussfolgerung lässt sich wegen unzureichender Angaben nicht bewerten.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "The conclusion is definitely true." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "The conclusion is possibly true." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The conclusion is definitely false." },
          ],
        },
        {
          isCorrect: false,
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
              text: "The conclusion cannot be assessed because there is insufficient information.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Simpulan tersebut pasti benar." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Simpulan tersebut mungkin benar." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Simpulan tersebut pasti salah." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Simpulan tersebut tidak relevan dengan informasi yang diberikan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Simpulan tersebut tidak dapat dinilai karena informasi tidak cukup.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
