import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "test-optional",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Text B agrees with Text A's aim but disputes what the grade figures show.",
        },
        {
          correct: false,
          label:
            "Text B argues that the university should go back to requiring test scores now.",
        },
        {
          correct: true,
          label:
            'According to Text B, the gap behind Text A\'s phrase "almost as high" is $$0.2$$ in average first-year grades.',
        },
        {
          correct: true,
          label:
            "Text B suggests that dropping tests may not remove the advantage that coaching gives.",
        },
        {
          correct: false,
          label:
            "Both writers report the rise in applications as evidence for their position.",
        },
      ],
    },
  },
};

export default item;
