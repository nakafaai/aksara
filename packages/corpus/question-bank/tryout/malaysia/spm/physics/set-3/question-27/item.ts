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
          label: "$$6.0\\text{ V}$$; $$6.0\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ V}$$; $$6.0\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$4.0\\text{ V}$$; $$5.97\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ V}$$; $$5.97\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6.0\\text{ V}$$; $$6.0\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$4.0\\text{ V}$$; $$6.0\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$4.0\\text{ V}$$; $$5.97\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ V}$$; $$5.97\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
