import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$p$$ dan $$q$$ keduanya bilangan ganjil.",
        },
        {
          correct: false,
          label: "Ada tepat empat pasangan $$\\{p,q\\}$$ yang memenuhi.",
        },
        {
          correct: true,
          label: "Nilai terbesar dari $$pq$$ adalah $$221$$.",
        },
        {
          correct: false,
          label: "$$p^2+q^2$$ selalu habis dibagi $$10$$.",
        },
        {
          correct: true,
          label: "$$p-q$$ selalu merupakan kelipatan $$4$$.",
        },
      ],
    },
  },
};

export default item;
