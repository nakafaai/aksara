import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "classroom-points",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Schools should ban all games because they distract pupils from learning.",
        },
        {
          correct: false,
          label:
            "Points and badges are the most effective way to keep pupils reading for years.",
        },
        {
          correct: true,
          label:
            "Schools should borrow games' feedback and challenge, not just their points.",
        },
        {
          correct: false,
          label:
            "Leaderboards should show every pupil's rank so that all try harder.",
        },
        {
          correct: false,
          label:
            "Pupils might learn more if teachers gave certificates for every task.",
        },
      ],
    },
  },
};

export default item;
