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
};

export default choices;
