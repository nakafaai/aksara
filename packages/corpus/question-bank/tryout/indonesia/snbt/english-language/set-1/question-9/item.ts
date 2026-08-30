import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "a ranking of sports by the calories they burn.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "replacing balanced meals with dietary supplements.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "ways to eliminate every source of stress." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "when and how to seek additional support for stress.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "the history of international nutrition guidance.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
