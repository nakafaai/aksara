import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "expensive" }] },
        { isCorrect: false, label: [{ kind: "text", text: "experimental" }] },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "not equal or consistent" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "widely available" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "carefully planned" }],
        },
      ],
    },
  },
};

export default item;
