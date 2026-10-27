import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "future-seeds",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Older packets contain instructions that later students should follow without checking context.",
        },
        {
          correct: true,
          label:
            "Check context before acting, and leave clear records for future participants.",
        },
        {
          correct: false,
          label:
            "The project should test the entire seed reserve at the first checkpoint.",
        },
        {
          correct: false,
          label: "Archive lists make experiments impossible.",
        },
        {
          correct: false,
          label:
            "Each class should finish its seed experiment without relying on earlier records.",
        },
      ],
    },
  },
};

export default item;
