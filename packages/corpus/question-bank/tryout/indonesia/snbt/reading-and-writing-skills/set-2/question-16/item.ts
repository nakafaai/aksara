import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "sogar." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "und." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "dass." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "wann." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "falls." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "even." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "and." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "that." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "when." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "if." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "bahkan." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "dan." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "bahwa." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ketika." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "jika." }],
        },
      ],
    },
  },
};

export default item;
