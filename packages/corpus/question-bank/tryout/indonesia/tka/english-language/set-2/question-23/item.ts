import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Entertainment details always require professional advice.",
        },
        {
          isCorrect: true,
          label:
            "Graphs, quotations, and product claims all require evidence questions.",
        },
        {
          isCorrect: false,
          label: "Screenshots are original sources by definition.",
        },
        {
          isCorrect: false,
          label: "Students have unlimited time for every claim.",
        },
        {
          isCorrect: false,
          label: "Website appearance is the only useful test.",
        },
      ],
    },
  },
  stimulusKey: "source-checking",
};

export default item;
