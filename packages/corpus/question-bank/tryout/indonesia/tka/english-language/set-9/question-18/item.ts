import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "paper-lantern",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "because the glue makes the strips stiff" },
        {
          correct: false,
          label: "because thicker paper is used for the lantern",
        },
        { correct: false, label: "because the cuts go past the line" },
        { correct: false, label: "because the handle pulls the strips upward" },
        {
          correct: true,
          label:
            "because each strip is still joined at both ends, so pushing the ends closer makes its middle bulge out",
        },
      ],
    },
  },
};

export default item;
