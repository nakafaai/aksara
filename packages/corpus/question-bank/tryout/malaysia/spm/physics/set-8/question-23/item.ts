import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$76\\text{ N}$$, $$64\\text{ N}$$ and $$81°$$",
        },
        {
          correct: false,
          label: "$$69\\text{ N}$$, $$69\\text{ N}$$ and no such angle",
        },
        {
          correct: false,
          label: "$$64\\text{ N}$$, $$76\\text{ N}$$ and $$81°$$",
        },
        {
          correct: false,
          label: "$$76\\text{ N}$$, $$64\\text{ N}$$ and $$8.5°$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$76\\text{ N}$$, $$64\\text{ N}$$ dan $$81°$$",
        },
        {
          correct: false,
          label:
            "$$69\\text{ N}$$, $$69\\text{ N}$$ dan tiada sudut sedemikian",
        },
        {
          correct: false,
          label: "$$64\\text{ N}$$, $$76\\text{ N}$$ dan $$81°$$",
        },
        {
          correct: false,
          label: "$$76\\text{ N}$$, $$64\\text{ N}$$ dan $$8.5°$$",
        },
      ],
    },
  },
};

export default item;
