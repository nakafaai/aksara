import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "fun-run",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{Rp}2{,}000$$ back, and $$\\text{Rp}64{,}000$$ paid in the end",
        },
        {
          correct: false,
          label:
            "$$\\text{Rp}8{,}000$$ back, and $$\\text{Rp}66{,}000$$ paid in the end",
        },
        {
          correct: false,
          label:
            "$$\\text{Rp}16{,}000$$ back, and $$\\text{Rp}50{,}000$$ paid in the end",
        },
        {
          correct: false,
          label:
            "$$\\text{Rp}8{,}000$$ back, and $$\\text{Rp}74{,}000$$ paid in the end",
        },
        {
          correct: true,
          label:
            "$$\\text{Rp}8{,}000$$ back, and $$\\text{Rp}58{,}000$$ paid in the end",
        },
      ],
    },
  },
};

export default item;
