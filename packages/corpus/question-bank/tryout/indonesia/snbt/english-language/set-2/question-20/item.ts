import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "A biography of the first clerical worker" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A list of jobs that will certainly disappear next year",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The history of electricity generation" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Instructions for building a language model from scratch",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Examples of how workers and organizations can adapt tasks through training and social dialogue",
            },
          ],
        },
      ],
    },
  },
};

export default item;
