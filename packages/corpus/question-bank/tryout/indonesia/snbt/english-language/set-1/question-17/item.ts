import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Paragraph " },
            { display: "block", kind: "math", math: "1" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Paragraph " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Paragraph " },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Paragraph " },
            { display: "block", kind: "math", math: "4" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Paragraph " },
            { display: "block", kind: "math", math: "5" },
          ],
        },
      ],
    },
  },
};

export default item;
