import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$12\\text{ V}$$ and $$100\\text{ Hz}$$, then $$0.38\\text{ W}$$ in each lamp",
        },
        {
          correct: true,
          label:
            "$$12\\text{ V}$$ and $$100\\text{ Hz}$$, then $$1.5\\text{ W}$$ in each lamp",
        },
        {
          correct: false,
          label:
            "$$12\\text{ V}$$ and $$50\\text{ Hz}$$, then $$1.5\\text{ W}$$ in each lamp",
        },
        {
          correct: false,
          label:
            "$$12\\text{ V}$$ and $$100\\text{ Hz}$$, then $$0.75\\text{ W}$$ in each lamp",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$12\\text{ V}$$ dan $$100\\text{ Hz}$$, kemudian $$0.38\\text{ W}$$ dalam setiap lampu",
        },
        {
          correct: true,
          label:
            "$$12\\text{ V}$$ dan $$100\\text{ Hz}$$, kemudian $$1.5\\text{ W}$$ dalam setiap lampu",
        },
        {
          correct: false,
          label:
            "$$12\\text{ V}$$ dan $$50\\text{ Hz}$$, kemudian $$1.5\\text{ W}$$ dalam setiap lampu",
        },
        {
          correct: false,
          label:
            "$$12\\text{ V}$$ dan $$100\\text{ Hz}$$, kemudian $$0.75\\text{ W}$$ dalam setiap lampu",
        },
      ],
    },
  },
};

export default item;
