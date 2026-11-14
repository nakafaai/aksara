import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "fried-rice",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "so that the eggs cook more quickly" },
        { correct: false, label: "so that the rice becomes stickier" },
        { correct: false, label: "so that the oil does not spit" },
        {
          correct: true,
          label:
            "because cooking them until brown would burn them and spoil the taste",
        },
        { correct: false, label: "because golden garlic is easier to chop" },
      ],
    },
  },
};

export default item;
