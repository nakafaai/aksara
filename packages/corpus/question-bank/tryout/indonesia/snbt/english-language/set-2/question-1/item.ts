import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Why Everyone Should Swim Every Day" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "How Recreational Water Spreads Illness" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Swimming: Possible Benefits and Safety Considerations",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The Best Exercise for People with Arthritis",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Why Water Exercise Prevents Every Illness" },
          ],
        },
      ],
    },
  },
};

export default item;
