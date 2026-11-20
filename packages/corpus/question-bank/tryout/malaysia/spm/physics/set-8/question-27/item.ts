import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.32\\text{ m s}^{-1}$$, $$50\\text{ kPa}$$ and $$9.5\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.32\\text{ m s}^{-1}$$, $$70\\text{ kPa}$$ and $$10.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.32\\text{ m s}^{-1}$$, $$30\\text{ kPa}$$ and $$7.5\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.32\\text{ m s}^{-1}$$, $$50\\text{ kPa}$$ and $$8.0\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.32\\text{ m s}^{-1}$$, $$50\\text{ kPa}$$ dan $$9.5\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.32\\text{ m s}^{-1}$$, $$70\\text{ kPa}$$ dan $$10.0\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.32\\text{ m s}^{-1}$$, $$30\\text{ kPa}$$ dan $$7.5\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.32\\text{ m s}^{-1}$$, $$50\\text{ kPa}$$ dan $$8.0\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
