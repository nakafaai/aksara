import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.48\\text{ eV}$$, $$72\\,\\mu\\text{A}$$ and $$190\\,\\mu\\text{A}$$",
        },
        {
          correct: true,
          label: "$$0.48\\text{ eV}$$, $$72\\,\\mu\\text{A}$$ and no current",
        },
        {
          correct: false,
          label: "$$2.8\\text{ eV}$$, $$72\\,\\mu\\text{A}$$ and no current",
        },
        {
          correct: false,
          label: "$$0.48\\text{ eV}$$, $$720\\,\\mu\\text{A}$$ and no current",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.48\\text{ eV}$$, $$72\\,\\mu\\text{A}$$ dan $$190\\,\\mu\\text{A}$$",
        },
        {
          correct: true,
          label: "$$0.48\\text{ eV}$$, $$72\\,\\mu\\text{A}$$ dan tiada arus",
        },
        {
          correct: false,
          label: "$$2.8\\text{ eV}$$, $$72\\,\\mu\\text{A}$$ dan tiada arus",
        },
        {
          correct: false,
          label: "$$0.48\\text{ eV}$$, $$720\\,\\mu\\text{A}$$ dan tiada arus",
        },
      ],
    },
  },
};

export default item;
