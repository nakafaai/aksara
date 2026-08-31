import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tempeh enthält mehr Energie als fettes Rindfleisch",
        },
        {
          isCorrect: false,
          label:
            "Fettes Rindfleisch enthält $$3{,}3\\text{ g}$$ mehr Protein pro $$100\\text{ g}$$ als Tempeh",
        },
        {
          isCorrect: true,
          label:
            "Tempeh enthält $$3{,}3\\text{ g}$$ mehr Protein pro $$100\\text{ g}$$ als fettes Rindfleisch",
        },
        {
          isCorrect: false,
          label:
            "Tempeh enthält $$13{,}2\\text{ g}$$ mehr Fett pro $$100\\text{ g}$$ als fettes Rindfleisch",
        },
        {
          isCorrect: false,
          label:
            "Fettes Rindfleisch enthält $$12{,}2\\text{ g}$$ mehr Fett pro $$100\\text{ g}$$ als Tempeh",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tempeh contains more energy than fatty beef",
        },
        {
          isCorrect: false,
          label:
            "Fatty beef contains $$3.3\\text{ g}$$ more protein per $$100\\text{ g}$$ than tempeh",
        },
        {
          isCorrect: true,
          label:
            "Tempeh contains $$3.3\\text{ g}$$ more protein per $$100\\text{ g}$$ than fatty beef",
        },
        {
          isCorrect: false,
          label:
            "Tempeh contains $$13.2\\text{ g}$$ more fat per $$100\\text{ g}$$ than fatty beef",
        },
        {
          isCorrect: false,
          label:
            "Fatty beef contains $$12.2\\text{ g}$$ more fat per $$100\\text{ g}$$ than tempeh",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tempe mengandung energi lebih tinggi daripada daging sapi gemuk",
        },
        {
          isCorrect: false,
          label:
            "Daging sapi gemuk mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada tempe",
        },
        {
          isCorrect: true,
          label:
            "Tempe mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada daging sapi gemuk",
        },
        {
          isCorrect: false,
          label:
            "Tempe mengandung lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada daging sapi gemuk",
        },
        {
          isCorrect: false,
          label:
            "Daging sapi gemuk mengandung lemak $$12{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$ daripada tempe",
        },
      ],
    },
  },
};

export default item;
