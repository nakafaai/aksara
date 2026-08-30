import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ Snackstrauß und $$2$$ Geldsträuße",
        },
        {
          isCorrect: true,
          label: "$$2$$ Snacksträuße und $$2$$ Geldsträuße",
        },
        {
          isCorrect: false,
          label: "$$1$$ großer Blumenstrauß und $$2$$ Geldsträuße",
        },
        {
          isCorrect: false,
          label: "$$1$$ großer Blumenstrauß und $$2$$ Snacksträuße",
        },
        {
          isCorrect: false,
          label: "$$1$$ kleiner Blumenstrauß und $$2$$ Snacksträuße",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ snack bouquet and $$2$$ money bouquets",
        },
        {
          isCorrect: true,
          label: "$$2$$ snack bouquets and $$2$$ money bouquets",
        },
        {
          isCorrect: false,
          label: "$$1$$ large flower and $$2$$ money bouquets",
        },
        {
          isCorrect: false,
          label: "$$1$$ large flower and $$2$$ snack bouquets",
        },
        {
          isCorrect: false,
          label: "$$1$$ small flower and $$2$$ snack bouquets",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ snack bouquet dan $$2$$ money bouquet",
        },
        {
          isCorrect: true,
          label: "$$2$$ snack bouquet dan $$2$$ money bouquet",
        },
        {
          isCorrect: false,
          label: "$$1$$ bunga besar dan $$2$$ money bouquet",
        },
        {
          isCorrect: false,
          label: "$$1$$ bunga besar dan $$2$$ snack bouquet",
        },
        {
          isCorrect: false,
          label: "$$1$$ bunga kecil dan $$2$$ snack bouquet",
        },
      ],
    },
  },
};

export default item;
