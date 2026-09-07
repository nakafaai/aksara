import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Naturreis liefert $$7\\,\\text{kcal}$$ weniger Energie als weißer Reis",
        },
        {
          isCorrect: false,
          label:
            "Naturreis enthält $$1{,}2\\,\\text{g}$$ mehr Ballaststoffe als weißer Reis",
        },
        {
          isCorrect: false,
          label:
            "Naturreis enthält $$27\\,\\text{mg}$$ mehr Magnesium als weißer Reis",
        },
        {
          isCorrect: false,
          label:
            "Naturreis enthält $$60\\,\\text{mg}$$ mehr Phosphor als weißer Reis",
        },
        {
          isCorrect: true,
          label:
            "Naturreis enthält $$2{,}59\\,\\text{g}$$ mehr Kohlenhydrate als weißer Reis",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Brown rice provides $$7\\,\\text{kcal}$$ less energy than white rice",
        },
        {
          isCorrect: false,
          label:
            "Brown rice provides $$1.2\\,\\text{g}$$ more fiber than white rice",
        },
        {
          isCorrect: false,
          label:
            "Brown rice provides $$27\\,\\text{mg}$$ more magnesium than white rice",
        },
        {
          isCorrect: false,
          label:
            "Brown rice provides $$60\\,\\text{mg}$$ more phosphorus than white rice",
        },
        {
          isCorrect: true,
          label:
            "Brown rice provides $$2.59\\,\\text{g}$$ more carbohydrate than white rice",
        },
      ],
    },
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
