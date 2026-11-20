import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$489\\text{ N}$$, $$173\\text{ N}$$ and $$68.2^\\circ$$",
        },
        {
          correct: true,
          label: "$$635\\text{ N}$$, $$300\\text{ N}$$ and $$68.2^\\circ$$",
        },
        {
          correct: false,
          label: "$$397\\text{ N}$$, $$93.8\\text{ N}$$ and $$68.2^\\circ$$",
        },
        {
          correct: false,
          label: "$$635\\text{ N}$$, $$300\\text{ N}$$ and $$21.8^\\circ$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$489\\text{ N}$$, $$173\\text{ N}$$ dan $$68.2^\\circ$$",
        },
        {
          correct: true,
          label: "$$635\\text{ N}$$, $$300\\text{ N}$$ dan $$68.2^\\circ$$",
        },
        {
          correct: false,
          label: "$$397\\text{ N}$$, $$93.8\\text{ N}$$ dan $$68.2^\\circ$$",
        },
        {
          correct: false,
          label: "$$635\\text{ N}$$, $$300\\text{ N}$$ dan $$21.8^\\circ$$",
        },
      ],
    },
  },
};

export default item;
