import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Naturreis liefert $$7$$ kcal weniger Energie als weißer Reis",
        },
        {
          isCorrect: false,
          label:
            "Naturreis enthält $$1{,}2$$ g mehr Ballaststoffe als weißer Reis",
        },
        {
          isCorrect: false,
          label: "Naturreis enthält $$27$$ mg mehr Magnesium als weißer Reis",
        },
        {
          isCorrect: false,
          label: "Naturreis enthält $$60$$ mg mehr Phosphor als weißer Reis",
        },
        {
          isCorrect: true,
          label:
            "Naturreis enthält $$2{,}59$$ g mehr Kohlenhydrate als weißer Reis",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Brown rice provides $$7$$ kcal less energy than white rice",
        },
        {
          isCorrect: false,
          label: "Brown rice provides $$1.2$$ g more fiber than white rice",
        },
        {
          isCorrect: false,
          label: "Brown rice provides $$27$$ mg more magnesium than white rice",
        },
        {
          isCorrect: false,
          label:
            "Brown rice provides $$60$$ mg more phosphorus than white rice",
        },
        {
          isCorrect: true,
          label:
            "Brown rice provides $$2.59$$ g more carbohydrate than white rice",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nasi merah mengandung energi $$7$$ kkal lebih rendah daripada nasi putih",
        },
        {
          isCorrect: false,
          label:
            "Nasi merah mengandung serat $$1{,}2$$ g lebih tinggi daripada nasi putih",
        },
        {
          isCorrect: false,
          label:
            "Nasi merah mengandung magnesium $$27$$ mg lebih tinggi daripada nasi putih",
        },
        {
          isCorrect: false,
          label:
            "Nasi merah mengandung fosfor $$60$$ mg lebih tinggi daripada nasi putih",
        },
        {
          isCorrect: true,
          label:
            "Nasi merah mengandung karbohidrat $$2{,}59$$ g lebih tinggi daripada nasi putih",
        },
      ],
    },
  },
};

export default item;
