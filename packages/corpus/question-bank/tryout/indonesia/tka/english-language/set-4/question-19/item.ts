import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "sequence",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The foil has to warm up in the sunlight before it can form an image.",
        },
        {
          isCorrect: false,
          label:
            "The image appears only after the eclipse has already started.",
        },
        {
          isCorrect: false,
          label:
            "Turning first makes the image larger than it would be otherwise.",
        },
        {
          isCorrect: false,
          label:
            "The pinhole must be made outside while you face away from the Sun.",
        },
        {
          isCorrect: true,
          label:
            "Facing away first means you never look toward the Sun while lining up the cards.",
        },
      ],
    },
  },
  stimulusKey: "pinhole-projector",
};

export default item;
