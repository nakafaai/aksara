import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause",
  },
  stimulus: "sidat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sidat muda yang ditangkap tidak sempat tumbuh menjadi sidat dewasa.",
        },
        {
          correct: false,
          label:
            "Sidat muda yang ditangkap biasanya memakan sidat dewasa di kolam.",
        },
        {
          correct: false,
          label:
            "Sidat dewasa ikut berpindah ke kolam budi daya bersama sidat muda.",
        },
        {
          correct: false,
          label: "Bendungan menahan sidat muda tetap tinggal di laut dalam.",
        },
        {
          correct: false,
          label:
            "Penangkapan sidat muda selalu dilakukan saat sidat dewasa sedang memijah.",
        },
      ],
    },
  },
};

export default item;
