import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.0\\text{ m}$$, $$5$$ per second and $$12\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$1.5\\text{ m}$$, $$10$$ per second and $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\text{ m}$$, $$23$$ per second and $$2.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.75\\text{ m}$$, $$20$$ per second and $$3.0\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.0\\text{ m}$$, $$5$$ kali sesaat dan $$12\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$1.5\\text{ m}$$, $$10$$ kali sesaat dan $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\text{ m}$$, $$23$$ kali sesaat dan $$2.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.75\\text{ m}$$, $$20$$ kali sesaat dan $$3.0\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
