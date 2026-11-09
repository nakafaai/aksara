import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "bike-lanes",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The lanes were separated from traffic by low concrete barriers.",
        },
        {
          correct: false,
          label:
            "The council member said Main Street had become more dangerous.",
        },
        {
          correct: true,
          label:
            "Cycling rose about 25 percent citywide, even on streets with no new lanes.",
        },
        {
          correct: false,
          label:
            "Station Avenue had fewer cyclists than Main Street in both periods.",
        },
        {
          correct: false,
          label:
            "The analyst said the risk per cyclist was the figure that mattered.",
        },
      ],
    },
  },
};

export default item;
