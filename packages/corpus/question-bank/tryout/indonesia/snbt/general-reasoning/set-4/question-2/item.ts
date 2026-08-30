import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ Teddybären",
        },
        {
          isCorrect: false,
          label: "$$2$$ Murmeln",
        },
        {
          isCorrect: false,
          label: "$$1$$ Ball und $$1$$ Barbie-Puppe",
        },
        {
          isCorrect: true,
          label: "$$1$$ Teddybär und $$1$$ Ball",
        },
        {
          isCorrect: false,
          label: "$$1$$ Barbie-Puppe und $$1$$ Murmel",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ teddy bears",
        },
        {
          isCorrect: false,
          label: "$$2$$ marbles",
        },
        {
          isCorrect: false,
          label: "$$1$$ ball and $$1$$ Barbie doll",
        },
        {
          isCorrect: true,
          label: "$$1$$ teddy bear and $$1$$ ball",
        },
        {
          isCorrect: false,
          label: "$$1$$ Barbie doll and $$1$$ marble",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ boneka beruang",
        },
        {
          isCorrect: false,
          label: "$$2$$ kelereng",
        },
        {
          isCorrect: false,
          label: "$$1$$ bola dan $$1$$ boneka Barbie",
        },
        {
          isCorrect: true,
          label: "$$1$$ boneka beruang dan $$1$$ bola",
        },
        {
          isCorrect: false,
          label: "$$1$$ boneka Barbie dan $$1$$ kelereng",
        },
      ],
    },
  },
};

export default item;
