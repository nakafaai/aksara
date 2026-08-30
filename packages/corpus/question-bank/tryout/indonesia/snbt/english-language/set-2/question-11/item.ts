import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Dismissive of all nutritional advice" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Certain that one food can prevent every infection",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Alarmist about eating any sugar" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Practical and evidence-based" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Indifferent to dietary habits" }],
        },
      ],
    },
  },
};

export default item;
