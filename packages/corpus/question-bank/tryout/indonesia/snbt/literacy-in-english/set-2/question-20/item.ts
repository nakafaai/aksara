import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "A biography of the first clerical worker",
        },
        {
          correct: true,
          label:
            "Examples of how workers and organizations can adapt tasks through training and social dialogue",
        },
        {
          correct: false,
          label: "A list of jobs that will certainly disappear next year",
        },
        {
          correct: false,
          label: "The history of electricity generation",
        },
        {
          correct: false,
          label: "Instructions for building a language model from scratch",
        },
      ],
    },
  },
};

export default item;
