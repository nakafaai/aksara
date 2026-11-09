import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "meat-survey",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "42",
        },
        {
          correct: true,
          label: "126",
        },
        {
          correct: false,
          label: "200",
        },
        {
          correct: false,
          label: "400",
        },
        {
          correct: false,
          label: "630",
        },
      ],
    },
  },
};

export default item;
