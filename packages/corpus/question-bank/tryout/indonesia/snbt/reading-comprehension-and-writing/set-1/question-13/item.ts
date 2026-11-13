import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "punctuation",
  },
  stimulus: "kenikir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bedeng cabai, yang dikelilingi kenikir mulai ramai didatangi kepik pada minggu keenam.",
        },
        {
          correct: false,
          label:
            "Bedeng cabai yang dikelilingi kenikir, mulai ramai didatangi kepik pada minggu keenam.",
        },
        {
          correct: true,
          label:
            "Bedeng cabai yang dikelilingi kenikir mulai ramai didatangi kepik pada minggu keenam.",
        },
        {
          correct: false,
          label:
            "Pada minggu keenam, bedeng cabai, yang dikelilingi kenikir, mulai ramai didatangi kepik.",
        },
        {
          correct: false,
          label:
            "Bedeng cabai mulai ramai didatangi kepik, yang dikelilingi kenikir, pada minggu keenam.",
        },
      ],
    },
  },
};

export default item;
