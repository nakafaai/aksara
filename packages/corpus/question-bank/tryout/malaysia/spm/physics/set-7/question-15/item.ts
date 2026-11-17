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
          label: "$$3.0\\text{ m}$$, $$5$$ per second and $$33\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$1.5\\text{ m}$$, $$10$$ per second and $$17\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.5\\text{ m}$$, $$23$$ per second and $$17\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.75\\text{ m}$$, $$20$$ per second and $$8.3\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.0\\text{ m}$$, $$5$$ kali sesaat dan $$33\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$1.5\\text{ m}$$, $$10$$ kali sesaat dan $$17\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$1.5\\text{ m}$$, $$23$$ kali sesaat dan $$17\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.75\\text{ m}$$, $$20$$ kali sesaat dan $$8.3\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
