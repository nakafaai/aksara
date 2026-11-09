import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "mango-tree",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Pak Darmo jarang membalas sapaan tetangga." },
        {
          correct: false,
          label: "Pak Darmo menatap ember di tangan Ayu tanpa berkata apa-apa.",
        },
        {
          correct: true,
          label:
            "Pak Darmo meminjamkan galah dan meminta Ayu membagikan mangga kepada anak-anak di gang.",
        },
        {
          correct: false,
          label:
            "Pohon mangga di halaman Pak Darmo tumbuh miring ke arah pagar.",
        },
        {
          correct: false,
          label: "Pak Darmo pernah memarahi anak-anak yang memanjat pagarnya.",
        },
      ],
    },
  },
};

export default item;
