import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "marine businesses earn profits in every country",
        },
        {
          isCorrect: false,
          label: "oceans benefit people only by producing rainfall",
        },
        {
          isCorrect: true,
          label:
            "coastal ecosystems provide communities with several forms of value",
        },
        {
          isCorrect: false,
          label:
            "ocean exploration should expand so people can extract more resources",
        },
        {
          isCorrect: false,
          label: "every person depends on exactly the same marine resource",
        },
      ],
    },
  },
};

export default item;
