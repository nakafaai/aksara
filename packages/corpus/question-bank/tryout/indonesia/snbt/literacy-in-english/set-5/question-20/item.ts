import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "great-stink",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "London has replaced every one of Bazalgette's sewers with new tunnels.",
        },
        {
          correct: true,
          label:
            "Growth beyond what Bazalgette planned for has partly brought the old problem back.",
        },
        {
          correct: false,
          label:
            "The new tunnel was needed because his pipes were too small from the start.",
        },
        {
          correct: false,
          label:
            "Heavy rain no longer reaches the old sewers since the tunnel was built.",
        },
        {
          correct: false,
          label:
            "The Thames is probably cleaner today than at any time in its history.",
        },
      ],
    },
  },
};

export default item;
