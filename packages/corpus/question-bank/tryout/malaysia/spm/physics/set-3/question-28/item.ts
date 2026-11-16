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
          label: "$$2.5\\text{ V}$$, $$0\\,\\Omega$$; $$0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ V}$$, $$1.0\\,\\Omega$$; $$2.0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ V}$$, $$2.0\\,\\Omega$$; $$2.0\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$3.0\\text{ V}$$, $$1.0\\,\\Omega$$; $$1.0\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.5\\text{ V}$$, $$0\\,\\Omega$$; $$0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ V}$$, $$1.0\\,\\Omega$$; $$2.0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ V}$$, $$2.0\\,\\Omega$$; $$2.0\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$3.0\\text{ V}$$, $$1.0\\,\\Omega$$; $$1.0\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
