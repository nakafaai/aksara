import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Paragraph $$4$$",
        },
        {
          correct: false,
          label: "Paragraph $$1$$",
        },
        {
          correct: false,
          label: "Paragraph $$2$$",
        },
        {
          correct: false,
          label: "Paragraph $$3$$",
        },
        {
          correct: false,
          label: "Paragraph $$5$$",
        },
      ],
    },
  },
};

export default item;
