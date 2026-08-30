import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tempeh enthält $$72\\text{ kcal}$$ mehr Energie und $$13{,}2\\text{ g}$$ mehr Fett pro $$100\\text{ g}$$",
        },
        {
          isCorrect: false,
          label:
            "Fettes Rindfleisch enthält $$3{,}3\\text{ g}$$ mehr Protein pro $$100\\text{ g}$$",
        },
        {
          isCorrect: false,
          label: "Tempeh und fettes Rindfleisch enthalten gleich viel Protein",
        },
        {
          isCorrect: false,
          label:
            "Fettes Rindfleisch enthält $$82\\text{ kcal}$$ mehr Energie pro $$100\\text{ g}$$",
        },
        {
          isCorrect: true,
          label:
            "Fettes Rindfleisch enthält $$72\\text{ kcal}$$ mehr Energie und $$13{,}2\\text{ g}$$ mehr Fett pro $$100\\text{ g}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tempeh contains $$72\\text{ kcal}$$ more energy and $$13.2\\text{ g}$$ more fat per $$100\\text{ g}$$",
        },
        {
          isCorrect: false,
          label:
            "Fatty beef contains $$3.3\\text{ g}$$ more protein per $$100\\text{ g}$$",
        },
        {
          isCorrect: false,
          label: "Tempeh and fatty beef contain the same amount of protein",
        },
        {
          isCorrect: false,
          label:
            "Fatty beef contains $$82\\text{ kcal}$$ more energy per $$100\\text{ g}$$",
        },
        {
          isCorrect: true,
          label:
            "Fatty beef contains $$72\\text{ kcal}$$ more energy and $$13.2\\text{ g}$$ more fat per $$100\\text{ g}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tempe mengandung energi $$72\\text{ kkal}$$ lebih banyak dan lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
        },
        {
          isCorrect: false,
          label:
            "Daging sapi gemuk mengandung protein $$3{,}3\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
        },
        {
          isCorrect: false,
          label:
            "Tempe dan daging sapi gemuk mengandung protein dalam jumlah yang sama",
        },
        {
          isCorrect: false,
          label:
            "Daging sapi gemuk mengandung energi $$82\\text{ kkal}$$ lebih banyak per $$100\\text{ g}$$",
        },
        {
          isCorrect: true,
          label:
            "Daging sapi gemuk mengandung energi $$72\\text{ kkal}$$ lebih banyak dan lemak $$13{,}2\\text{ g}$$ lebih banyak per $$100\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
