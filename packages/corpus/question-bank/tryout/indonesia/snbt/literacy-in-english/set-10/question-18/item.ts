import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "golden-record",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The makers expected to play the record again after the launch.",
        },
        {
          correct: false,
          label: "The record was too small for anyone else ever to notice it.",
        },
        {
          correct: false,
          label:
            "The makers' names were engraved in large letters on the cover.",
        },
        {
          correct: true,
          label: "Choosing its contents made them reflect on what humanity is.",
        },
        {
          correct: false,
          label:
            "The makers planned to sell copies of the music on the record.",
        },
      ],
    },
  },
};

export default item;
