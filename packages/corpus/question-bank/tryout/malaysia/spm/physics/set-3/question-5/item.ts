import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$45\\text{ cm}$$ and $$5\\text{ cm}$$, and the lighter block again rises $$45\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$45\\text{ cm}$$ and $$5\\text{ cm}$$, and the lighter block rises $$50\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$45\\text{ cm}$$ and $$15\\text{ cm}$$, and the lighter block rises $$60\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$45\\text{ cm}$$ and $$5\\text{ cm}$$, and the lighter block rises $$60\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$45\\text{ cm}$$ dan $$5\\text{ cm}$$, dan blok yang lebih ringan sekali lagi naik $$45\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$45\\text{ cm}$$ dan $$5\\text{ cm}$$, dan blok yang lebih ringan naik $$50\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$45\\text{ cm}$$ dan $$15\\text{ cm}$$, dan blok yang lebih ringan naik $$60\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$45\\text{ cm}$$ dan $$5\\text{ cm}$$, dan blok yang lebih ringan naik $$60\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
