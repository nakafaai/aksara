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
          label: "$$5.0\\text{ A}$$, $$11.5\\text{ V}$$ and $$80\\%$$",
        },
        {
          correct: false,
          label: "$$45\\text{ A}$$, $$16.5\\text{ V}$$ and $$80\\%$$",
        },
        {
          correct: false,
          label: "$$5.0\\text{ A}$$, $$12.5\\text{ V}$$ and $$83\\%$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ A}$$, $$12.5\\text{ V}$$ and $$80\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5.0\\text{ A}$$, $$11.5\\text{ V}$$ dan $$80\\%$$",
        },
        {
          correct: false,
          label: "$$45\\text{ A}$$, $$16.5\\text{ V}$$ dan $$80\\%$$",
        },
        {
          correct: false,
          label: "$$5.0\\text{ A}$$, $$12.5\\text{ V}$$ dan $$83\\%$$",
        },
        {
          correct: true,
          label: "$$5.0\\text{ A}$$, $$12.5\\text{ V}$$ dan $$80\\%$$",
        },
      ],
    },
  },
};

export default item;
