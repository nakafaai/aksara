import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "open-offices",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It rejects the research as outdated, arguing that the badge studies show distance no longer affects how often colleagues talk.",
        },
        {
          correct: false,
          label:
            "It accepts the research and agrees that an open plan, by bringing desks closer, will lead colleagues to talk more in person.",
        },
        {
          correct: false,
          label:
            "It doubts the research because Allen studied only engineers, whose habits may not match those of other office workers.",
        },
        {
          correct: true,
          label:
            "It grants that distance cuts contact but argues that removing partitions does not bring people closer in the way that counts.",
        },
        {
          correct: false,
          label:
            "It uses the research to explain the rise in email, since colleagues who sit far apart send messages instead of walking over.",
        },
      ],
    },
  },
};

export default item;
