import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$T(2{,}5)=18{.}000$$",
        },
        {
          correct: true,
          label: "$$T(3)=T(2{,}1)$$",
        },
        {
          correct: false,
          label: "$$T(1{,}5)=12{.}000$$",
        },
        {
          correct: true,
          label:
            "Dengan uang $$\\text{Rp}30{.}000$$, berat paket paling besar yang dapat dikirim adalah $$6$$ kg.",
        },
        {
          correct: false,
          label: "$$T(4)=2\\cdot T(2)$$",
        },
      ],
    },
  },
};

export default item;
