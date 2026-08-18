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
};

export default choices;
