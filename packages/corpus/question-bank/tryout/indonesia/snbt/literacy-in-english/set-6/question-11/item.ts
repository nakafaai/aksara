import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "library-loans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "They rose by about $$200\\%$$, which supports the headline, since e-book loans tripled.",
        },
        {
          correct: false,
          label:
            "They rose by about $$11\\%$$, which partly supports the headline, since more was borrowed overall.",
        },
        {
          correct: true,
          label:
            "They rose by about $$1\\%$$, which suggests that readers mostly changed format rather than read more.",
        },
        {
          correct: false,
          label:
            "They fell by about $$10\\%$$, which contradicts the headline, since print loans fell.",
        },
        {
          correct: false,
          label:
            "They rose by about $$1\\%$$, which suggests that e-books drew in many new readers who had not borrowed before.",
        },
      ],
    },
  },
};

export default item;
