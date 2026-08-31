import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Older packets contain instructions that later students should follow without checking context.",
        },
        {
          isCorrect: true,
          label:
            "Check context before acting, and leave clear records for future participants.",
        },
        {
          isCorrect: false,
          label:
            "The project should test the entire seed reserve at the first checkpoint.",
        },
        {
          isCorrect: false,
          label: "Archive lists make experiments impossible.",
        },
        {
          isCorrect: false,
          label:
            "Each class should finish its seed experiment without relying on earlier records.",
        },
      ],
    },
  },
  stimulusKey: "future-seeds",
};

export default item;
