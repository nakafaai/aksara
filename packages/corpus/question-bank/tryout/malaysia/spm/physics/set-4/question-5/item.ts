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
          label:
            "$$1.3 \\times 10^4\\text{ N}$$, and about $$12$$ times as large without the belt",
        },
        {
          correct: false,
          label:
            "$$3.9 \\times 10^4\\text{ N}$$, and about $$4$$ times as large without the belt",
        },
        {
          correct: false,
          label:
            "$$1.3 \\times 10^4\\text{ N}$$, and about $$1.3$$ times as large without the belt",
        },
        {
          correct: false,
          label:
            "$$2.6 \\times 10^4\\text{ N}$$, and about $$12$$ times as large without the belt",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.3 \\times 10^4\\text{ N}$$, dan kira-kira $$12$$ kali lebih besar tanpa tali pinggang",
        },
        {
          correct: false,
          label:
            "$$3.9 \\times 10^4\\text{ N}$$, dan kira-kira $$4$$ kali lebih besar tanpa tali pinggang",
        },
        {
          correct: false,
          label:
            "$$1.3 \\times 10^4\\text{ N}$$, dan kira-kira $$1.3$$ kali lebih besar tanpa tali pinggang",
        },
        {
          correct: false,
          label:
            "$$2.6 \\times 10^4\\text{ N}$$, dan kira-kira $$12$$ kali lebih besar tanpa tali pinggang",
        },
      ],
    },
  },
};

export default item;
