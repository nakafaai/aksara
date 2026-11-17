import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.1 \\times 10^5\\text{ N}$$, about $$107\\text{ m}$$, and $$1.2 \\times 10^6\\text{ Pa}$$",
        },
        {
          correct: false,
          label:
            "$$2.6 \\times 10^5\\text{ N}$$, about $$117\\text{ m}$$, and $$1.2 \\times 10^6\\text{ Pa}$$",
        },
        {
          correct: false,
          label:
            "$$5.2 \\times 10^5\\text{ N}$$, about $$58\\text{ m}$$, and $$6.0 \\times 10^5\\text{ Pa}$$",
        },
        {
          correct: true,
          label:
            "$$2.6 \\times 10^5\\text{ N}$$, about $$117\\text{ m}$$, and $$1.3 \\times 10^6\\text{ Pa}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.1 \\times 10^5\\text{ N}$$, kira-kira $$107\\text{ m}$$, dan $$1.2 \\times 10^6\\text{ Pa}$$",
        },
        {
          correct: false,
          label:
            "$$2.6 \\times 10^5\\text{ N}$$, kira-kira $$117\\text{ m}$$, dan $$1.2 \\times 10^6\\text{ Pa}$$",
        },
        {
          correct: false,
          label:
            "$$5.2 \\times 10^5\\text{ N}$$, kira-kira $$58\\text{ m}$$, dan $$6.0 \\times 10^5\\text{ Pa}$$",
        },
        {
          correct: true,
          label:
            "$$2.6 \\times 10^5\\text{ N}$$, kira-kira $$117\\text{ m}$$, dan $$1.3 \\times 10^6\\text{ Pa}$$",
        },
      ],
    },
  },
};

export default item;
