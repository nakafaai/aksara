import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "aber." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "jedoch." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "das." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "also." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "weil." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "but." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "however." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "that." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "so." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "because." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "tetapi." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "akan tetapi." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "bahwa." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "sehingga." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "karena." }],
        },
      ],
    },
  },
};

export default item;
