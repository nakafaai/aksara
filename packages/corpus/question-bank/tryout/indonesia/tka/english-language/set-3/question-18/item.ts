import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "fair-discussion",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Joko should be allowed to correct the restatement so the response begins from his actual meaning.",
        },
        {
          correct: false,
          label:
            "Maya's evidence should be rejected because an inaccurate restatement makes later evidence unusable.",
        },
        {
          correct: false,
          label:
            "The participation list should award Joko another turn and record it as a higher score.",
        },
        {
          correct: false,
          label:
            "Maya should repeat the dominant view, even if it differs from the point Joko made.",
        },
        {
          correct: false,
          label:
            "The group should redefine the original question so Maya's restatement becomes accurate.",
        },
      ],
    },
  },
};

export default item;
