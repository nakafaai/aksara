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
          isCorrect: false,
          label:
            "Keep the original instructions so a revision does not confuse household members.",
        },
        {
          isCorrect: true,
          label: "The household should revise that part of the plan.",
        },
        {
          isCorrect: false,
          label: "The plan should keep the confusing wording unchanged.",
        },
        {
          isCorrect: false,
          label:
            "The out-of-area contact is the primary person who should know both meeting places.",
        },
        {
          isCorrect: false,
          label:
            "The out-of-area contact should receive the plan without names to reduce privacy risk.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
