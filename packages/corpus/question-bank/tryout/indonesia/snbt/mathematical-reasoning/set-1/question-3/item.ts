import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "home-battery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penghematan $$\\text{Rp}25{.}000{,}00$$ dengan kapasitas $$16\\text{ kWh}$$",
        },
        {
          correct: false,
          label:
            "Penghematan $$\\text{Rp}21{.}000{,}00$$ dengan kapasitas $$16\\text{ kWh}$$",
        },
        {
          correct: false,
          label:
            "Penghematan $$\\text{Rp}21{.}000{,}00$$ dengan kapasitas $$14\\text{ kWh}$$",
        },
        {
          correct: false,
          label:
            "Penghematan $$\\text{Rp}20{.}000{,}00$$ dengan kapasitas $$16\\text{ kWh}$$",
        },
        {
          correct: true,
          label:
            "Penghematan $$\\text{Rp}20{.}000{,}00$$ dengan kapasitas $$14\\text{ kWh}$$",
        },
      ],
    },
  },
};

export default item;
