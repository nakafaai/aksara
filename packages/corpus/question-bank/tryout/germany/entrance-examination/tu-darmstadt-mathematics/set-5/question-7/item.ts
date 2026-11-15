import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "auf $$0$$",
        },
        {
          correct: true,
          label: "auf $$8$$",
        },
        {
          correct: false,
          label: "auf $$2$$",
        },
        {
          correct: false,
          label: "auf $$9$$",
        },
        {
          correct: false,
          label: "auf $$6$$",
        },
        {
          correct: false,
          label: "auf $$4$$",
        },
      ],
    },
  },
};

export default item;
