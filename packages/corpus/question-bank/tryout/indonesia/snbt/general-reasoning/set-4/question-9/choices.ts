import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Tempeh enthält $$72\\text{ kcal}$$ mehr Energie und $$13{,}2\\text{ g}$$ mehr Fett pro $$100\\text{ g}$$",
      value: false,
    },
    {
      label:
        "Fettes Rindfleisch enthält $$3{,}3\\text{ g}$$ mehr Protein pro $$100\\text{ g}$$",
      value: false,
    },
    {
      label: "Tempeh und fettes Rindfleisch enthalten gleich viel Protein",
      value: false,
    },
    {
      label:
        "Fettes Rindfleisch enthält $$82\\text{ kcal}$$ mehr Energie pro $$100\\text{ g}$$",
      value: false,
    },
    {
      label:
        "Fettes Rindfleisch enthält $$72\\text{ kcal}$$ mehr Energie und $$13{,}2\\text{ g}$$ mehr Fett pro $$100\\text{ g}$$",
      value: true,
    },
  ],
  en: [
    {
      label:
        "Tempeh contains $$72\\text{ kcal}$$ more energy and $$13.2\\text{ g}$$ more fat per $$100\\text{ g}$$",
      value: false,
    },
    {
      label:
        "Fatty beef contains $$3.3\\text{ g}$$ more protein per $$100\\text{ g}$$",
      value: false,
    },
    {
      label: "Tempeh and fatty beef contain the same amount of protein",
      value: false,
    },
    {
      label:
        "Fatty beef contains $$82\\text{ kcal}$$ more energy per $$100\\text{ g}$$",
      value: false,
    },
    {
      label:
        "Fatty beef contains $$72\\text{ kcal}$$ more energy and $$13.2\\text{ g}$$ more fat per $$100\\text{ g}$$",
      value: true,
    },
  ],
  id: [
    {
      label:
        "Tempe mengandung energi $$72\\text{ kkal}$$ lebih banyak dan lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
      value: false,
    },
    {
      label:
        "Daging sapi gemuk mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
      value: false,
    },
    {
      label:
        "Tempe dan daging sapi gemuk mengandung protein dalam jumlah yang sama",
      value: false,
    },
    {
      label:
        "Daging sapi gemuk mengandung energi $$82\\text{ kkal}$$ lebih banyak per $$100\\text{ g}$$",
      value: false,
    },
    {
      label:
        "Daging sapi gemuk mengandung energi $$72\\text{ kkal}$$ lebih banyak dan lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
      value: true,
    },
  ],
};

export default choices;
