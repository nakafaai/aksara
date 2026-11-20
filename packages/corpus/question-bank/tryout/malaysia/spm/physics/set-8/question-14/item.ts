import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12.5\\text{ Hz}$$, $$19\\text{ Hz}$$ and $$0\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$12.5\\text{ Hz}$$, $$19\\text{ Hz}$$ and $$2.0\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.080\\text{ Hz}$$, $$0.053\\text{ Hz}$$ and $$2.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$12.5\\text{ Hz}$$, $$19\\text{ Hz}$$ and $$6.0\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12.5\\text{ Hz}$$, $$19\\text{ Hz}$$ dan $$0\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$12.5\\text{ Hz}$$, $$19\\text{ Hz}$$ dan $$2.0\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.080\\text{ Hz}$$, $$0.053\\text{ Hz}$$ dan $$2.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$12.5\\text{ Hz}$$, $$19\\text{ Hz}$$ dan $$6.0\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
