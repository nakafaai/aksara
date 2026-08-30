import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The household should revise that part of the plan.",
        },
        {
          isCorrect: false,
          label: "The household should stop practicing forever.",
        },
        {
          isCorrect: false,
          label: "The plan should keep the confusing wording unchanged.",
        },
        {
          isCorrect: false,
          label: "All meeting places should be kept secret.",
        },
        {
          isCorrect: false,
          label: "The out-of-area contact should receive no names.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
