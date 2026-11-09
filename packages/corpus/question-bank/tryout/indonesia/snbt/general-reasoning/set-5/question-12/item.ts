import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conditional-chain",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Debit Sungai Cilaki naik, tetapi perahu wisata tetap beroperasi.",
        },
        {
          correct: true,
          label:
            "Perahu wisata beroperasi dan pintu air bendungan hulu tidak dibuka.",
        },
        {
          correct: false,
          label:
            "Pintu air bendungan hulu dibuka, tetapi debit Sungai Cilaki tidak naik.",
        },
        {
          correct: false,
          label:
            "Perahu wisata tidak beroperasi, tetapi pedagang tetap membuka lapaknya.",
        },
        {
          correct: false,
          label:
            "Debit Sungai Cilaki naik karena hujan, bukan karena pintu air dibuka.",
        },
      ],
    },
  },
};

export default item;
