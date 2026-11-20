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
          correct: false,
          label: "$$10\\text{ m s}^{-1}$$, $$2.5\\text{ m}$$ and $$1$$ blow",
        },
        {
          correct: true,
          label: "$$2.5\\text{ m s}^{-1}$$, $$0.16\\text{ m}$$ and $$7$$ blows",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ m s}^{-1}$$, $$0.10\\text{ m}$$ and $$10$$ blows",
        },
        {
          correct: false,
          label: "$$2.5\\text{ m s}^{-1}$$, $$0.16\\text{ m}$$ and $$6$$ blows",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10\\text{ m s}^{-1}$$, $$2.5\\text{ m}$$ dan $$1$$ hentaman",
        },
        {
          correct: true,
          label:
            "$$2.5\\text{ m s}^{-1}$$, $$0.16\\text{ m}$$ dan $$7$$ hentaman",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ m s}^{-1}$$, $$0.10\\text{ m}$$ dan $$10$$ hentaman",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ m s}^{-1}$$, $$0.16\\text{ m}$$ dan $$6$$ hentaman",
        },
      ],
    },
  },
};

export default item;
