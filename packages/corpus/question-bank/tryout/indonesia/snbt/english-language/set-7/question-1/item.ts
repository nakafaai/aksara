import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The class tested how a blue-light filter affected leaf growth under different light colours, while controlling the listed factors but treating one short trial as proof of a universal effect.",
        },
        {
          isCorrect: false,
          label:
            "The class tested how a blue-light filter affected leaf growth under different light colours, while reporting the limitation but leaving the comparison conditions out of the interpretation.",
        },
        {
          isCorrect: false,
          label:
            "The class tested how a blue-light filter affected leaf growth under different light colours, while treating the scientific term as the measured outcome that settles the investigation.",
        },
        {
          isCorrect: true,
          label:
            "The class observed greater new leaf area with a blue filter under mostly controlled conditions, but reduced light intensity prevented attributing the difference to colour alone.",
        },
        {
          isCorrect: false,
          label:
            "The class tested how a blue-light filter affected leaf growth under different light colours, while using the comparison only to confirm the initial hypothesis and excluding the remaining uncertainty.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
