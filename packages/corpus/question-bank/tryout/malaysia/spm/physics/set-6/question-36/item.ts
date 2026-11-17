import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$28\\text{ MeV}$$ per nucleon, and $$6.8 \\times 10^{11}\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$7.1\\text{ MeV}$$ per nucleon, and $$6.8 \\times 10^{11}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ MeV}$$ per nucleon, and $$1.7 \\times 10^{11}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ MeV}$$ per nucleon, and $$2.7 \\times 10^{12}\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$28\\text{ MeV}$$ setiap nukleon, dan $$6.8 \\times 10^{11}\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$7.1\\text{ MeV}$$ setiap nukleon, dan $$6.8 \\times 10^{11}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ MeV}$$ setiap nukleon, dan $$1.7 \\times 10^{11}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$7.1\\text{ MeV}$$ setiap nukleon, dan $$2.7 \\times 10^{12}\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
