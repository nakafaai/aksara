import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ Belletristikbücher",
        },
        {
          isCorrect: false,
          label: "$$1$$ Belletristikbuch und $$1$$ Wissenschaftsbuch",
        },
        {
          isCorrect: true,
          label: "$$2$$ Wissenschaftsbücher",
        },
        {
          isCorrect: false,
          label: "$$1$$ Wissenschaftsbuch und $$1$$ Geschichtsbuch",
        },
        {
          isCorrect: false,
          label: "$$2$$ Geschichtsbücher",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ fiction books",
        },
        {
          isCorrect: false,
          label: "$$1$$ fiction book and $$1$$ science book",
        },
        {
          isCorrect: true,
          label: "$$2$$ science books",
        },
        {
          isCorrect: false,
          label: "$$1$$ science book and $$1$$ history book",
        },
        {
          isCorrect: false,
          label: "$$2$$ history books",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ buku fiksi",
        },
        {
          isCorrect: false,
          label: "$$1$$ buku fiksi dan $$1$$ buku sains",
        },
        {
          isCorrect: true,
          label: "$$2$$ buku sains",
        },
        {
          isCorrect: false,
          label: "$$1$$ buku sains dan $$1$$ buku sejarah",
        },
        {
          isCorrect: false,
          label: "$$2$$ buku sejarah",
        },
      ],
    },
  },
};

export default item;
