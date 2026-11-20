import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$6.0\\text{ s}$$, $$156\\text{ m}$$ and $$276\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ s}$$, $$156\\text{ m}$$ and $$156\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ s}$$, $$96\\text{ m}$$ and $$176\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ s}$$, $$36\\text{ m}$$ and $$156\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$6.0\\text{ s}$$, $$156\\text{ m}$$ dan $$276\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ s}$$, $$156\\text{ m}$$ dan $$156\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ s}$$, $$96\\text{ m}$$ dan $$176\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ s}$$, $$36\\text{ m}$$ dan $$156\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
