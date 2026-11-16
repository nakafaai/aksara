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
          correct: true,
          label: "$$0.43\\text{ A}$$; $$0.86\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.29\\text{ A}$$; $$2.57\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ A}$$; $$1.00\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$0.75\\text{ A}$$; $$1.50\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.43\\text{ A}$$; $$0.86\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.29\\text{ A}$$; $$2.57\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ A}$$; $$1.00\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$0.75\\text{ A}$$; $$1.50\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
