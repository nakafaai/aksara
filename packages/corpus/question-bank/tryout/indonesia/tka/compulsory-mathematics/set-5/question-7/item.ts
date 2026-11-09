import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Memakai voucher lebih dahulu lebih murah $$\\text{Rp}10{.}000$$.",
        },
        {
          correct: false,
          label:
            "Memakai diskon lebih dahulu lebih murah $$\\text{Rp}40{.}000$$.",
        },
        {
          correct: false,
          label:
            "Memakai voucher lebih dahulu lebih murah $$\\text{Rp}50{.}000$$.",
        },
        {
          correct: false,
          label: "Kedua urutan menghasilkan harga yang sama.",
        },
        {
          correct: true,
          label:
            "Memakai diskon lebih dahulu lebih murah $$\\text{Rp}10{.}000$$.",
        },
      ],
    },
  },
};

export default item;
