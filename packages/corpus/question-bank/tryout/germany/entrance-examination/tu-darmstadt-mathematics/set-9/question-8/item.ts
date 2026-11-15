import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x=\\log_{\\frac23}6$$",
        },
        {
          correct: false,
          label: "$$x=\\log_6\\frac32$$",
        },
        {
          correct: false,
          label: "$$x=\\log_{\\frac32}3$$",
        },
        {
          correct: true,
          label: "$$x=\\log_{\\frac32}6$$",
        },
        {
          correct: false,
          label: "$$x=-1$$",
        },
        {
          correct: false,
          label: "Es gibt keine reelle Zahl $$x$$ mit dieser Eigenschaft.",
        },
      ],
    },
  },
};

export default item;
