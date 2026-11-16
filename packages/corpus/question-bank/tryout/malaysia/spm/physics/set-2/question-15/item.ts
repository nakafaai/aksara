import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$36\\text{ cm s}^{-1}$$; slowly backward at $$6.0\\text{ cm s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$36\\text{ cm s}^{-1}$$; slowly forward at $$1.5\\text{ cm s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$36\\text{ cm s}^{-1}$$; slowly forward at $$6.0\\text{ cm s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$9.0\\text{ cm s}^{-1}$$; slowly forward at $$1.5\\text{ cm s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$36\\text{ cm s}^{-1}$$; perlahan ke belakang pada $$6.0\\text{ cm s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$36\\text{ cm s}^{-1}$$; perlahan ke hadapan pada $$1.5\\text{ cm s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$36\\text{ cm s}^{-1}$$; perlahan ke hadapan pada $$6.0\\text{ cm s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$9.0\\text{ cm s}^{-1}$$; perlahan ke hadapan pada $$1.5\\text{ cm s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
