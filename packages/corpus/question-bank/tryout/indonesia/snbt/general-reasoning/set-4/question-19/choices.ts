import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Brown rice provides $$7$$ kcal less energy than white rice",
      value: false,
    },
    {
      label: "Brown rice provides $$1.2$$ g more fiber than white rice",
      value: false,
    },
    {
      label: "Brown rice provides $$27$$ mg more magnesium than white rice",
      value: false,
    },
    {
      label: "Brown rice provides $$2.59$$ g more carbohydrate than white rice",
      value: true,
    },
    {
      label: "Brown rice provides $$60$$ mg more phosphorus than white rice",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Nasi merah mengandung energi $$7$$ kkal lebih rendah daripada nasi putih",
      value: false,
    },
    {
      label:
        "Nasi merah mengandung serat $$1{,}2$$ g lebih tinggi daripada nasi putih",
      value: false,
    },
    {
      label:
        "Nasi merah mengandung magnesium $$27$$ mg lebih tinggi daripada nasi putih",
      value: false,
    },
    {
      label:
        "Nasi merah mengandung karbohidrat $$2{,}59$$ g lebih tinggi daripada nasi putih",
      value: true,
    },
    {
      label:
        "Nasi merah mengandung fosfor $$60$$ mg lebih tinggi daripada nasi putih",
      value: false,
    },
  ],
};

export default choices;
