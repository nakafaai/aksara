import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nasi beras pecah kulit mengandung energi $$7\\,\\text{kkal}$$ lebih rendah daripada nasi putih",
        },
        {
          isCorrect: false,
          label:
            "Nasi beras pecah kulit mengandung serat $$1{,}2\\,\\text{g}$$ lebih tinggi daripada nasi putih",
        },
        {
          isCorrect: false,
          label:
            "Nasi beras pecah kulit mengandung magnesium $$27\\,\\text{mg}$$ lebih tinggi daripada nasi putih",
        },
        {
          isCorrect: false,
          label:
            "Nasi beras pecah kulit mengandung fosfor $$60\\,\\text{mg}$$ lebih tinggi daripada nasi putih",
        },
        {
          isCorrect: true,
          label:
            "Nasi beras pecah kulit mengandung karbohidrat $$2{,}59\\,\\text{g}$$ lebih tinggi daripada nasi putih",
        },
      ],
    },
  },
};

export default item;
