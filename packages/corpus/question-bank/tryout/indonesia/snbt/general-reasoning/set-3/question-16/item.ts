import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Der Apfel enthält weniger Fett als Jicama.",
        },
        {
          isCorrect: false,
          label: "Jicama liefert $$14$$ Kilokalorien weniger als der Apfel.",
        },
        {
          isCorrect: false,
          label:
            "Jicama enthält $$0{,}46\\,\\text{g}$$ mehr Eiweiß als der Apfel.",
        },
        {
          isCorrect: false,
          label:
            "Beide Lebensmittel enthalten weniger als $$1\\,\\text{g}$$ Eiweiß pro $$100\\,\\text{g}$$.",
        },
        {
          isCorrect: false,
          label:
            "Beide Lebensmittel enthalten weniger als $$1\\,\\text{g}$$ Fett pro $$100\\,\\text{g}$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Apple provides less fat than jicama.",
        },
        {
          isCorrect: false,
          label: "Jicama provides $$14$$ fewer kilocalories than apple.",
        },
        {
          isCorrect: false,
          label:
            "Jicama provides $$0.46\\,\\text{g}$$ more protein than apple.",
        },
        {
          isCorrect: false,
          label:
            "Both foods provide less than $$1\\,\\text{g}$$ of protein per $$100\\,\\text{g}$$.",
        },
        {
          isCorrect: false,
          label:
            "Both foods provide less than $$1\\,\\text{g}$$ of fat per $$100\\,\\text{g}$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Apel mengandung lemak lebih sedikit daripada bengkuang.",
        },
        {
          isCorrect: false,
          label:
            "Bengkuang memberikan energi $$14\\,\\text{kkal}$$ lebih sedikit daripada apel.",
        },
        {
          isCorrect: false,
          label:
            "Bengkuang mengandung protein $$0{,}46\\,\\text{g}$$ lebih banyak daripada apel.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pangan mengandung protein kurang dari $$1\\,\\text{g}$$ per $$100\\,\\text{g}$$.",
        },
        {
          isCorrect: false,
          label:
            "Kedua pangan mengandung lemak kurang dari $$1\\,\\text{g}$$ per $$100\\,\\text{g}$$.",
        },
      ],
    },
  },
};

export default item;
