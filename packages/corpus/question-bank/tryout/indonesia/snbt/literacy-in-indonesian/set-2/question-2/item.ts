import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "mercury-gold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hulu $$0{,}36$$ dan hilir $$0{,}80$$, jadi pelipatan di hilir lebih dari $$2$$ kali pelipatan di hulu.",
        },
        {
          correct: false,
          label:
            "Hulu $$9$$ dan hilir $$7$$, jadi pelipatan sepanjang rantai makanan lebih kuat di dekat tambang.",
        },
        {
          correct: false,
          label:
            "Hulu $$7$$ dan hilir $$15$$, jadi pelipatan di hilir lebih dari $$2$$ kali pelipatan di hulu.",
        },
        {
          correct: true,
          label:
            "Hulu $$7$$ dan hilir $$9$$, jadi kadar pemangsa hilir lebih tinggi karena kadar pemakan tumbuhan dan pelipatannya sama-sama lebih besar.",
        },
        {
          correct: false,
          label:
            "Hulu $$7$$ dan hilir $$9$$, jadi kadar pemangsa hilir lebih tinggi semata-mata karena pelipatannya lebih besar.",
        },
      ],
    },
  },
};

export default item;
