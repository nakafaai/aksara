import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "book-cover",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "so that the tape sticks more strongly" },
        { correct: false, label: "so that the plastic becomes thicker" },
        {
          correct: false,
          label: "so that the title can be read through the cover",
        },
        { correct: false, label: "so that the book closes more tightly" },
        {
          correct: true,
          label:
            "so that the plastic can be removed at the end of the year without tearing any pages",
        },
      ],
    },
  },
};

export default item;
