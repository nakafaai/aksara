import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "A complete failure" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "A legal requirement" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "A historical sequence" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "A guaranteed advantage" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "A compromise between competing benefits and costs",
            },
          ],
        },
      ],
    },
  },
};

export default item;
