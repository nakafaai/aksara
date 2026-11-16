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
          correct: false,
          label: "$$25\\text{ cm}$$; Q, $$2.25\\text{ J}$$",
        },
        {
          correct: true,
          label: "$$25\\text{ cm}$$; P, $$2.25\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ cm}$$; P, $$0.36\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$25\\text{ cm}$$; P, $$4.5\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25\\text{ cm}$$; Q, $$2.25\\text{ J}$$",
        },
        {
          correct: true,
          label: "$$25\\text{ cm}$$; P, $$2.25\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ cm}$$; P, $$0.36\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$25\\text{ cm}$$; P, $$4.5\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
