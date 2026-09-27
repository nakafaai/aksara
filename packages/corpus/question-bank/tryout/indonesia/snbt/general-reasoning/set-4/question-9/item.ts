import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tempe mengandung energi $$72\\text{ kkal}$$ lebih banyak dan lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
        },
        {
          isCorrect: false,
          label:
            "Daging sapi gemuk mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
        },
        {
          isCorrect: false,
          label:
            "Tempe dan daging sapi gemuk mengandung protein dalam jumlah yang sama",
        },
        {
          isCorrect: true,
          label:
            "Daging sapi gemuk mengandung energi $$72\\text{ kkal}$$ lebih banyak dan lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
        },
        {
          isCorrect: false,
          label:
            "Daging sapi gemuk mengandung energi $$82\\text{ kkal}$$ lebih banyak per $$100\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
