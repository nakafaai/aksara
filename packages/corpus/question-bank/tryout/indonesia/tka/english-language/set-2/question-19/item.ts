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
            "Household members should memorise the existing wording more carefully.",
        },
        {
          isCorrect: true,
          label: "The household should revise that part of the plan.",
        },
        {
          isCorrect: false,
          label:
            "The household should wait for a real emergency before deciding whether to revise it.",
        },
        {
          isCorrect: false,
          label: "The plan should omit that step so no one needs to follow it.",
        },
        {
          isCorrect: false,
          label:
            "The out-of-area contact should choose a new instruction alone.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
