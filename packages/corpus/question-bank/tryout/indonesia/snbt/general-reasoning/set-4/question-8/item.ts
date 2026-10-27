import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tempe mengandung energi lebih tinggi daripada daging sapi gemuk",
        },
        {
          correct: false,
          label:
            "Daging sapi gemuk mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada tempe",
        },
        {
          correct: true,
          label:
            "Tempe mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada daging sapi gemuk",
        },
        {
          correct: false,
          label:
            "Tempe mengandung lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada daging sapi gemuk",
        },
        {
          correct: false,
          label:
            "Daging sapi gemuk mengandung lemak $$12{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada tempe",
        },
      ],
    },
  },
};

export default item;
