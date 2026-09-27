import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ buku fiksi",
        },
        {
          isCorrect: true,
          label: "$$2$$ buku sains",
        },
        {
          isCorrect: false,
          label: "$$1$$ buku fiksi dan $$1$$ buku sains",
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
