import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "courier-rates",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "lebih dari $$10\\text{ kg}$$ dan paling berat $$11\\text{ kg}$$",
        },
        {
          correct: false,
          label: "lebih dari $$10{,}3\\text{ kg}$$ dan paling berat $$11{,}3\\text{ kg}$$",
        },
        {
          correct: false,
          label: "paling berat $$11{,}2\\text{ kg}$$",
        },
        {
          correct: false,
          label: "lebih dari $$11{,}2\\text{ kg}$$ dan paling berat $$11{,}3\\text{ kg}$$",
        },
        {
          correct: true,
          label: "berapa pun, asalkan paling berat $$11{,}3\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
