import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Evidence and trade-offs in choosing an office layout",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "How to calculate the construction cost of an office",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Why email should replace every meeting" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The history of corporate architecture" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "How to decorate a private office" }],
        },
      ],
    },
  },
};

export default item;
