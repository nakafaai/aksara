import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Jicama liefert $$14$$ Kilokalorien weniger als der Apfel.",
      value: false,
    },
    {
      label: "Jicama enthält $$0{,}46$$ g mehr Eiweiß als der Apfel.",
      value: false,
    },
    {
      label: "Der Apfel enthält weniger Fett als Jicama.",
      value: true,
    },
    {
      label:
        "Beide Lebensmittel enthalten weniger als $$1$$ g Eiweiß pro $$100$$ g.",
      value: false,
    },
    {
      label:
        "Beide Lebensmittel enthalten weniger als $$1$$ g Fett pro $$100$$ g.",
      value: false,
    },
  ],
  en: [
    {
      label: "Jicama provides $$14$$ fewer kilocalories than apple.",
      value: false,
    },
    {
      label: "Jicama provides $$0.46$$ g more protein than apple.",
      value: false,
    },
    {
      label: "Apple provides less fat than jicama.",
      value: true,
    },
    {
      label: "Both foods provide less than $$1$$ g of protein per $$100$$ g.",
      value: false,
    },
    {
      label: "Both foods provide less than $$1$$ g of fat per $$100$$ g.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Bengkuang memberikan energi $$14$$ kkal lebih sedikit daripada apel.",
      value: false,
    },
    {
      label:
        "Bengkuang mengandung protein $$0{,}46$$ g lebih banyak daripada apel.",
      value: false,
    },
    {
      label: "Apel mengandung lemak lebih sedikit daripada bengkuang.",
      value: true,
    },
    {
      label:
        "Kedua pangan mengandung protein kurang dari $$1$$ g per $$100$$ g.",
      value: false,
    },
    {
      label: "Kedua pangan mengandung lemak kurang dari $$1$$ g per $$100$$ g.",
      value: false,
    },
  ],
};

export default choices;
