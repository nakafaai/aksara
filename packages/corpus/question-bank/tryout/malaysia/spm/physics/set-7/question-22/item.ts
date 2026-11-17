import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.17\\text{ m}$$, $$10\\text{ N}$$, $$50\\text{ N}$$ and $$2.5\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$0.17\\text{ m}$$, $$12\\text{ N}$$, $$25\\text{ N}$$ and $$0.63\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$0.040\\text{ m}$$, $$12\\text{ N}$$, $$42\\text{ N}$$ and $$1.7\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$0.17\\text{ m}$$, $$12\\text{ N}$$, $$63\\text{ N}$$ and $$3.9\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.17\\text{ m}$$, $$10\\text{ N}$$, $$50\\text{ N}$$ dan $$2.5\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$0.17\\text{ m}$$, $$12\\text{ N}$$, $$25\\text{ N}$$ dan $$0.63\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$0.040\\text{ m}$$, $$12\\text{ N}$$, $$42\\text{ N}$$ dan $$1.7\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$0.17\\text{ m}$$, $$12\\text{ N}$$, $$63\\text{ N}$$ dan $$3.9\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
