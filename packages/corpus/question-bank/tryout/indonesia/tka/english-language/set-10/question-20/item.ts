import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "fact-opinion",
  },
  stimulus: "book-cover",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Covering one book takes about ten minutes." },
        {
          correct: false,
          label:
            "You will need a roll of clear plastic cover, scissors, a ruler, a pencil, and clear tape.",
        },
        { correct: false, label: "Cut along the line." },
        {
          correct: true,
          label:
            "In my opinion, a book you have covered yourself is a book you take better care of.",
        },
        {
          correct: false,
          label: "If the cover feels tight, loosen the side flaps a little.",
        },
      ],
    },
  },
};

export default item;
