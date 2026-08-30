import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Jicama liefert $$14$$ Kilokalorien weniger als der Apfel.",
        },
        {
          isCorrect: false,
          label: "Jicama enthält $$0{,}46$$ g mehr Eiweiß als der Apfel.",
        },
        {
          isCorrect: false,
          label:
            "Beide Lebensmittel enthalten weniger als $$1$$ g Eiweiß pro $$100$$ g.",
        },
        {
          isCorrect: true,
          label: "Der Apfel enthält weniger Fett als Jicama.",
        },
        {
          isCorrect: false,
          label:
            "Beide Lebensmittel enthalten weniger als $$1$$ g Fett pro $$100$$ g.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Jicama provides $$14$$ fewer kilocalories than apple.",
        },
        {
          isCorrect: false,
          label: "Jicama provides $$0.46$$ g more protein than apple.",
        },
        {
          isCorrect: false,
          label:
            "Both foods provide less than $$1$$ g of protein per $$100$$ g.",
        },
        {
          isCorrect: true,
          label: "Apple provides less fat than jicama.",
        },
        {
          isCorrect: false,
          label: "Both foods provide less than $$1$$ g of fat per $$100$$ g.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bengkuang memberikan energi $$14$$ kkal lebih sedikit daripada apel.",
        },
        {
          isCorrect: false,
          label:
            "Bengkuang mengandung protein $$0{,}46$$ g lebih banyak daripada apel.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pangan mengandung protein kurang dari $$1$$ g per $$100$$ g.",
        },
        {
          isCorrect: true,
          label: "Apel mengandung lemak lebih sedikit daripada bengkuang.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pangan mengandung lemak kurang dari $$1$$ g per $$100$$ g.",
        },
      ],
    },
  },
};

export default item;
