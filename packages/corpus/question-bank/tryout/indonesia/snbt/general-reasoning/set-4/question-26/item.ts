import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "Maschinen $$A$$ und $$B$$ haben denselben höchsten Index",
        },
        {
          isCorrect: false,
          label: "Maschinen $$B$$ und $$C$$ haben denselben höchsten Index",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "Machines $$A$$ and $$B$$ tie for the highest index",
        },
        {
          isCorrect: false,
          label: "Machines $$B$$ and $$C$$ tie for the highest index",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "Mesin $$A$$ dan $$B$$ memiliki indeks tertinggi yang sama",
        },
        {
          isCorrect: false,
          label: "Mesin $$B$$ dan $$C$$ memiliki indeks tertinggi yang sama",
        },
      ],
    },
  },
};

export default item;
