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
          correct: false,
          label:
            "Rani yang lupa mengembalikan kunci, dan pernyataan Yosef benar.",
        },
        {
          correct: false,
          label: "Pernyataan Putu dan pernyataan Vina sama-sama salah.",
        },
        {
          correct: true,
          label:
            "Vina yang lupa mengembalikan kunci, dan pernyataan Rani benar.",
        },
        {
          correct: false,
          label:
            "Yosef yang lupa mengembalikan kunci, dan pernyataan Joko benar.",
        },
        {
          correct: false,
          label:
            "Vina yang lupa mengembalikan kunci, dan pernyataan Joko benar.",
        },
      ],
    },
  },
};

export default item;
