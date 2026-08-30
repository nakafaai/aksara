import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The boat is designed mainly to provide permanent internet access.",
        },
        {
          isCorrect: false,
          label: "Every village uses exactly the same dock in every season.",
        },
        {
          isCorrect: false,
          label: "The crew stores all returned books outside the cabin.",
        },
        {
          isCorrect: true,
          label:
            "The boat adapts library services to river conditions and different users.",
        },
        {
          isCorrect: false,
          label: "A library building was copied without any changes.",
        },
      ],
    },
  },
  stimulusKey: "library-boat",
};

export default item;
