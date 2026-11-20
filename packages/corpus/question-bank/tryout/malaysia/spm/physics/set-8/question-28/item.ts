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
          correct: false,
          label: "$$0.10\\,\\Omega$$, $$15.0\\text{ V}$$ and $$240\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.10\\,\\Omega$$, $$14.5\\text{ V}$$ and $$200\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.35\\,\\Omega$$, $$15.0\\text{ V}$$ and $$71\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$0.10\\,\\Omega$$, $$15.0\\text{ V}$$ and $$200\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.10\\,\\Omega$$, $$15.0\\text{ V}$$ dan $$240\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.10\\,\\Omega$$, $$14.5\\text{ V}$$ dan $$200\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$0.35\\,\\Omega$$, $$15.0\\text{ V}$$ dan $$71\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$0.10\\,\\Omega$$, $$15.0\\text{ V}$$ dan $$200\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
