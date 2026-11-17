import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
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
            "$$2.0\\text{ A}$$ and $$8.0\\text{ W}$$, then $$1.2\\text{ A}$$ and $$5.8\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ A}$$ and $$8.0\\text{ W}$$, then $$1.5\\text{ A}$$ and $$9.0\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\text{ A}$$ and $$18\\text{ W}$$, then $$1.5\\text{ A}$$ and $$9.0\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ A}$$ and $$12\\text{ W}$$, then $$1.2\\text{ A}$$ and $$7.2\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$2.0\\text{ A}$$ dan $$8.0\\text{ W}$$, kemudian $$1.2\\text{ A}$$ dan $$5.8\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ A}$$ dan $$8.0\\text{ W}$$, kemudian $$1.5\\text{ A}$$ dan $$9.0\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$3.0\\text{ A}$$ dan $$18\\text{ W}$$, kemudian $$1.5\\text{ A}$$ dan $$9.0\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$2.0\\text{ A}$$ dan $$12\\text{ W}$$, kemudian $$1.2\\text{ A}$$ dan $$7.2\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
