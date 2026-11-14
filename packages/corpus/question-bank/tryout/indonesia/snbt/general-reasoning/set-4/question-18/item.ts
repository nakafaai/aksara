import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "truth-teller",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Jam dinding, termos, kamus, payung",
        },
        {
          correct: false,
          label: "Payung, jam dinding, kamus, termos",
        },
        {
          correct: false,
          label: "Jam dinding, termos, payung, kamus",
        },
        {
          correct: false,
          label: "Termos, jam dinding, kamus, payung",
        },
        {
          correct: false,
          label: "Payung, termos, kamus, jam dinding",
        },
      ],
    },
  },
};

export default item;
