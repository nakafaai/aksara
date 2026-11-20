import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$26.7\\,\\Omega$$ and $$665\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$1.44\\text{ kW}$$, $$26.7\\,\\Omega$$ and $$665\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$18.5\\,\\Omega$$ and $$734\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$26.7\\,\\Omega$$ and $$499\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$26.7\\,\\Omega$$ dan $$665\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$1.44\\text{ kW}$$, $$26.7\\,\\Omega$$ dan $$665\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$18.5\\,\\Omega$$ dan $$734\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$26.7\\,\\Omega$$ dan $$499\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
