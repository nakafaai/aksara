import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$P(B)<P(A)$$",
        },
        {
          correct: true,
          label: "$$P(B\\mid A)<P(A)$$",
        },
        {
          correct: false,
          label: "Peluang kedua bola berwarna sama paling besar jika $$r=4$$.",
        },
        {
          correct: true,
          label: "Kejadian $$A$$ dan $$B$$ tidak saling bebas.",
        },
        {
          correct: true,
          label: "$$P(A\\mid B)=P(B\\mid A)$$",
        },
      ],
    },
  },
};

export default item;
