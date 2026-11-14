import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "class-mural",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "voting on a theme for the mural" },
        { correct: false, label: "filling two cracks with cement" },
        {
          correct: true,
          label: "sketching the outline of the picture in chalk",
        },
        {
          correct: false,
          label: "the canteen owner noticing students eating near the wall",
        },
        {
          correct: false,
          label: "adding thin white lines to the river's surface",
        },
      ],
    },
  },
};

export default item;
