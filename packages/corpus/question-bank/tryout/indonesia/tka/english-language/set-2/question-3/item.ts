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
          label:
            "The service follows one standard docking arrangement in each village throughout the year.",
        },
        {
          isCorrect: false,
          label:
            "The crew prioritizes outdoor storage so returned books do not narrow the cabin aisle.",
        },
        {
          isCorrect: false,
          label: "A library building was copied without any changes.",
        },
        {
          isCorrect: true,
          label:
            "The boat adapts library services to river conditions and different users.",
        },
      ],
    },
  },
  stimulusKey: "library-boat",
};

export default item;
