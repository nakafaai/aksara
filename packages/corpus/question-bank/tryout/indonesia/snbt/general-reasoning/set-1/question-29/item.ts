import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Klasse A" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Klasse B" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Klasse C" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Klasse D" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Klasse E" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Class A" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Class B" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Class C" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Class D" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Class E" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Kelas A" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Kelas B" }] },
        { isCorrect: true, label: [{ kind: "text", text: "Kelas C" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Kelas D" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Kelas E" }] },
      ],
    },
  },
};

export default item;
