import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "A biography of the first clerical worker" },
        {
          isCorrect: false,
          label: "A list of jobs that will certainly disappear next year",
        },
        { isCorrect: false, label: "The history of electricity generation" },
        {
          isCorrect: false,
          label: "Instructions for building a language model from scratch",
        },
        {
          isCorrect: true,
          label:
            "Examples of how workers and organizations can adapt tasks through training and social dialogue",
        },
      ],
    },
  },
};

export default item;
