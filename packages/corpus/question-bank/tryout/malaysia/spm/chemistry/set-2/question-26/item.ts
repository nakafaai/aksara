import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "In cell P the blue colour fades, and the cathode of Q gains $$3.2\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "The anode of P loses $$3.2\\text{ g}$$, and the solution in Q turns colourless as oxygen forms at its anode",
        },
        {
          correct: false,
          label:
            "The anode of P loses $$6.4\\text{ g}$$, and the solution in Q turns colourless",
        },
        {
          correct: false,
          label:
            "The anode of P loses $$3.2\\text{ g}$$, and the solution in Q stays blue",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dalam sel P warna biru pudar, dan katod Q bertambah $$3.2\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "Anod P berkurang $$3.2\\text{ g}$$, dan larutan dalam Q menjadi tidak berwarna apabila oksigen terbentuk di anodnya",
        },
        {
          correct: false,
          label:
            "Anod P berkurang $$6.4\\text{ g}$$, dan larutan dalam Q menjadi tidak berwarna",
        },
        {
          correct: false,
          label:
            "Anod P berkurang $$3.2\\text{ g}$$, dan larutan dalam Q kekal biru",
        },
      ],
    },
  },
};

export default item;
