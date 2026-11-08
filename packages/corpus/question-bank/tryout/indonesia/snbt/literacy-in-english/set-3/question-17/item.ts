import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "rosetta-stone",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Young limited sound signs to foreign names, but Champollion found them in Egyptian names too.",
        },
        {
          correct: false,
          label:
            "Young read the Greek text, while Champollion read only the Demotic text.",
        },
        {
          correct: false,
          label:
            "Young believed hieroglyphs were purely mystical, while Champollion believed they were only sounds.",
        },
        {
          correct: false,
          label:
            "Young studied temples in Egypt, while Champollion studied only the stone in London.",
        },
        {
          correct: false,
          label:
            "Young identified Ramesses and Thutmose, while Champollion identified Ptolemy.",
        },
      ],
    },
  },
};

export default item;
