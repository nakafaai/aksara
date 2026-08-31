import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The 2.78 V series mean proves that placing two cells in series will produce the same voltage in every circuit.",
        },
        {
          isCorrect: false,
          label:
            "The similar one-cell and parallel means show that cell arrangement has no effect, so the series result should be ignored as an outlier.",
        },
        {
          isCorrect: false,
          label:
            "The measurements provide no useful evidence until a later experiment reproduces every mean to the same decimal places.",
        },
        {
          isCorrect: true,
          label:
            "Under one fixed load, the series mean was 2.78 V compared with 1.46 V and 1.44 V; unmeasured internal resistance and the single load limit broader claims.",
        },
        {
          isCorrect: false,
          label:
            "Because the series mean was the largest, the one-cell and parallel conditions are unnecessary when interpreting the result.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
