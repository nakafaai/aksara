import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "grosir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25$$ botol saja",
        },
        {
          correct: false,
          label: "$$26$$ botol saja",
        },
        {
          correct: false,
          label: "$$19$$ atau $$20$$ botol",
        },
        {
          correct: true,
          label: "$$25$$ atau $$26$$ botol",
        },
        {
          correct: false,
          label: "$$26$$ atau $$27$$ botol",
        },
      ],
    },
  },
};

export default item;
