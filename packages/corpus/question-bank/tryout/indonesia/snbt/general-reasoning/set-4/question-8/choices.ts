import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Tempeh enthält mehr Energie als fettes Rindfleisch",
      value: false,
    },
    {
      label:
        "Fettes Rindfleisch enthält $$3{,}3\\text{ g}$$ mehr Protein pro $$100\\text{ g}$$ als Tempeh",
      value: false,
    },
    {
      label:
        "Tempeh enthält $$13{,}2\\text{ g}$$ mehr Fett pro $$100\\text{ g}$$ als fettes Rindfleisch",
      value: false,
    },
    {
      label:
        "Tempeh enthält $$3{,}3\\text{ g}$$ mehr Protein pro $$100\\text{ g}$$ als fettes Rindfleisch",
      value: true,
    },
    {
      label:
        "Fettes Rindfleisch enthält $$12{,}2\\text{ g}$$ mehr Fett pro $$100\\text{ g}$$ als Tempeh",
      value: false,
    },
  ],
  en: [
    { label: "Tempeh contains more energy than fatty beef", value: false },
    {
      label:
        "Fatty beef contains $$3.3\\text{ g}$$ more protein per $$100\\text{ g}$$ than tempeh",
      value: false,
    },
    {
      label:
        "Tempeh contains $$13.2\\text{ g}$$ more fat per $$100\\text{ g}$$ than fatty beef",
      value: false,
    },
    {
      label:
        "Tempeh contains $$3.3\\text{ g}$$ more protein per $$100\\text{ g}$$ than fatty beef",
      value: true,
    },
    {
      label:
        "Fatty beef contains $$12.2\\text{ g}$$ more fat per $$100\\text{ g}$$ than tempeh",
      value: false,
    },
  ],
  id: [
    {
      label: "Tempe mengandung energi lebih tinggi daripada daging sapi gemuk",
      value: false,
    },
    {
      label:
        "Daging sapi gemuk mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada tempe",
      value: false,
    },
    {
      label:
        "Tempe mengandung lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada daging sapi gemuk",
      value: false,
    },
    {
      label:
        "Tempe mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada daging sapi gemuk",
      value: true,
    },
    {
      label:
        "Daging sapi gemuk mengandung lemak $$12{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada tempe",
      value: false,
    },
  ],
};

export default choices;
