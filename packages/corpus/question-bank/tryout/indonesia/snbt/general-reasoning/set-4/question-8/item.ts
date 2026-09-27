import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tempe mengandung energi lebih tinggi daripada daging sapi gemuk",
        },
        {
          isCorrect: false,
          label:
            "Daging sapi gemuk mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada tempe",
        },
        {
          isCorrect: true,
          label:
            "Tempe mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada daging sapi gemuk",
        },
        {
          isCorrect: false,
          label:
            "Tempe mengandung lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada daging sapi gemuk",
        },
        {
          isCorrect: false,
          label:
            "Daging sapi gemuk mengandung lemak $$12{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada tempe",
        },
      ],
    },
  },
};

export default item;
