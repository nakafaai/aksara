import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "sequence",
  },
  stimulus: "pinhole-projector",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The foil has to warm up in the sunlight before it can form an image.",
        },
        {
          correct: false,
          label:
            "The image appears only after the eclipse has already started.",
        },
        {
          correct: false,
          label:
            "Turning first makes the image larger than it would be otherwise.",
        },
        {
          correct: false,
          label:
            "The pinhole must be made outside while you face away from the Sun.",
        },
        {
          correct: true,
          label:
            "Facing away first means you never look toward the Sun while lining up the cards.",
        },
      ],
    },
  },
};

export default item;
