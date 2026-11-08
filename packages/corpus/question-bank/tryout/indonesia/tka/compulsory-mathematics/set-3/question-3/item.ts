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
          label: "$$q>p$$",
        },
        {
          correct: true,
          label: "$$p>r$$",
        },
        {
          correct: false,
          label: "$$r>q$$",
        },
        {
          correct: true,
          label: "Bilangan $$p\\cdot r$$ terdiri atas $$29$$ angka.",
        },
        {
          correct: false,
          label: "$$q<10^{15}$$",
        },
      ],
    },
  },
};

export default item;
