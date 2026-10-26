import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$A = B$$ atau $$E \\neq F$$",
        },
        {
          correct: false,
          label: "Jika $$A = B$$, maka $$E = F$$",
        },
        {
          correct: false,
          label: "$$A = B$$ atau $$E = F$$",
        },
        {
          correct: false,
          label: "$$A \\neq B$$ dan $$E = F$$",
        },
        {
          correct: false,
          label: "$$E \\neq F$$ atau $$A \\neq B$$",
        },
      ],
    },
  },
};

export default item;
