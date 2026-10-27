import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tempe mengandung energi $$72\\text{ kkal}$$ lebih banyak dan lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "Daging sapi gemuk mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "Tempe dan daging sapi gemuk mengandung protein dalam jumlah yang sama",
        },
        {
          correct: true,
          label:
            "Daging sapi gemuk mengandung energi $$72\\text{ kkal}$$ lebih banyak dan lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "Daging sapi gemuk mengandung energi $$82\\text{ kkal}$$ lebih banyak per $$100\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
