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
          label:
            "$$13\\text{ N}$$ at $$47^\\circ$$ above the horizontal, then $$67\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$13\\text{ N}$$ at $$47^\\circ$$ above the horizontal, then $$60\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$14\\text{ N}$$ at $$40^\\circ$$ above the horizontal, then $$60\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$9.2\\text{ N}$$ horizontally, then $$46\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$13\\text{ N}$$ pada $$47^\\circ$$ di atas garis mengufuk, kemudian $$67\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$13\\text{ N}$$ pada $$47^\\circ$$ di atas garis mengufuk, kemudian $$60\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$14\\text{ N}$$ pada $$40^\\circ$$ di atas garis mengufuk, kemudian $$60\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$9.2\\text{ N}$$ secara mengufuk, kemudian $$46\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
