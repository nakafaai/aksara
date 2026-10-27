import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2$$ buku fiksi",
        },
        {
          correct: true,
          label: "$$2$$ buku sains",
        },
        {
          correct: false,
          label: "$$1$$ buku fiksi dan $$1$$ buku sains",
        },
        {
          correct: false,
          label: "$$1$$ buku sains dan $$1$$ buku sejarah",
        },
        {
          correct: false,
          label: "$$2$$ buku sejarah",
        },
      ],
    },
  },
};

export default item;
