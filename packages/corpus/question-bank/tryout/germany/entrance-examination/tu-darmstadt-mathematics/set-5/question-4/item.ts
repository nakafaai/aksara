import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ €}$$",
        },
        {
          correct: false,
          label: "Die Angaben passen zu keinem Preis.",
        },
        {
          correct: false,
          label: "$$24\\text{ €}$$",
        },
        {
          correct: true,
          label: "$$30\\text{ €}$$",
        },
        {
          correct: false,
          label: "$$150\\text{ €}$$",
        },
      ],
    },
  },
};

export default item;
