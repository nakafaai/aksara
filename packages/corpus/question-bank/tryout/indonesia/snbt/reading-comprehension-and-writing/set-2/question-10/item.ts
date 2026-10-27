import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "($$2$$)-($$4$$)-($$3$$)-($$5$$)-($$1$$).",
        },
        {
          correct: true,
          label: "($$3$$)-($$5$$)-($$2$$)-($$4$$)-($$1$$).",
        },
        {
          correct: false,
          label: "($$3$$)-($$1$$)-($$5$$)-($$2$$)-($$4$$).",
        },
        {
          correct: false,
          label: "($$1$$)-($$3$$)-($$2$$)-($$4$$)-($$5$$).",
        },
        {
          correct: false,
          label: "($$5$$)-($$2$$)-($$3$$)-($$1$$)-($$4$$).",
        },
      ],
    },
  },
};

export default item;
