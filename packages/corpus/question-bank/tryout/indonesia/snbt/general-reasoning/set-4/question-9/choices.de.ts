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
};

export default choices;
