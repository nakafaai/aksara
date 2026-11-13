import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "Die Länge hängt davon ab, wohin die Parabel verschoben wird.",
        },
        {
          correct: false,
          label: "$$2\\sqrt2$$",
        },
      ],
    },
  },
};

export default item;
