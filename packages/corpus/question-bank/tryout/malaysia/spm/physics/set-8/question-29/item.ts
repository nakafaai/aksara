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
            "$$300\\text{ A}$$, $$0.150\\text{ A}$$, then $$0.240\\text{ A}$$ and the fuse does not melt",
        },
        {
          correct: false,
          label:
            "$$300\\text{ A}$$, $$0\\text{ A}$$, then $$0.240\\text{ A}$$ and the fuse does not melt",
        },
        {
          correct: false,
          label:
            "$$480\\text{ A}$$, $$0.240\\text{ A}$$, then $$0.240\\text{ A}$$ and the fuse does not melt",
        },
        {
          correct: false,
          label:
            "$$300\\text{ A}$$, $$0.150\\text{ A}$$, then $$0.240\\text{ A}$$ and the fuse melts",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$300\\text{ A}$$, $$0.150\\text{ A}$$, kemudian $$0.240\\text{ A}$$ dan fius tidak lebur",
        },
        {
          correct: false,
          label:
            "$$300\\text{ A}$$, $$0\\text{ A}$$, kemudian $$0.240\\text{ A}$$ dan fius tidak lebur",
        },
        {
          correct: false,
          label:
            "$$480\\text{ A}$$, $$0.240\\text{ A}$$, kemudian $$0.240\\text{ A}$$ dan fius tidak lebur",
        },
        {
          correct: false,
          label:
            "$$300\\text{ A}$$, $$0.150\\text{ A}$$, kemudian $$0.240\\text{ A}$$ dan fius lebur",
        },
      ],
    },
  },
};

export default item;
