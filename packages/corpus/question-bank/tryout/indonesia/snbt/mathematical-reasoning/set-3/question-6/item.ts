import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Erstes Angebot" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Zweites Angebot" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Beide Angebote sind gleichwertig" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das erste Angebot ist doppelt so groß" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kann nicht bestimmt werden" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "First offer" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Second offer" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Both offers are equal" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "First offer is twice as large" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Cannot be determined" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tawaran pertama" }],
        },
        { isCorrect: true, label: [{ kind: "text", text: "Tawaran kedua" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kedua tawaran sama besar" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tawaran pertama dua kali lebih besar" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tidak dapat ditentukan" }],
        },
      ],
    },
  },
};

export default item;
