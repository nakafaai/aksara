import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Joko should be allowed to correct the restatement so the response begins from his actual meaning.",
        },
        {
          isCorrect: false,
          label:
            "Maya's evidence should be rejected because an inaccurate restatement makes later evidence unusable.",
        },
        {
          isCorrect: false,
          label:
            "The participation list should award Joko another turn and record it as a higher score.",
        },
        {
          isCorrect: false,
          label:
            "Maya should repeat the dominant view, even if it differs from the point Joko made.",
        },
        {
          isCorrect: false,
          label:
            "The group should redefine the original question so Maya's restatement becomes accurate.",
        },
      ],
    },
  },
  stimulusKey: "fair-discussion",
};

export default item;
