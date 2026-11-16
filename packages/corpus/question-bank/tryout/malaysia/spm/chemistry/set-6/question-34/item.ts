import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$170\\text{ kJ}$$, $$11.2\\text{ g}$$, the reaction has a high activation energy that the burning magnesium supplies",
        },
        {
          correct: true,
          label:
            "$$85.0\\text{ kJ}$$, $$11.2\\text{ g}$$, the reaction has a high activation energy that the burning magnesium supplies",
        },
        {
          correct: false,
          label:
            "$$85.0\\text{ kJ}$$, $$5.6\\text{ g}$$, the reaction has a high activation energy that the burning magnesium supplies",
        },
        {
          correct: false,
          label:
            "$$85.0\\text{ kJ}$$, $$11.2\\text{ g}$$, the reaction absorbs heat overall, which the burning magnesium supplies",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$170\\text{ kJ}$$, $$11.2\\text{ g}$$, tindak balas itu mempunyai tenaga pengaktifan tinggi yang dibekalkan oleh magnesium yang terbakar",
        },
        {
          correct: true,
          label:
            "$$85.0\\text{ kJ}$$, $$11.2\\text{ g}$$, tindak balas itu mempunyai tenaga pengaktifan tinggi yang dibekalkan oleh magnesium yang terbakar",
        },
        {
          correct: false,
          label:
            "$$85.0\\text{ kJ}$$, $$5.6\\text{ g}$$, tindak balas itu mempunyai tenaga pengaktifan tinggi yang dibekalkan oleh magnesium yang terbakar",
        },
        {
          correct: false,
          label:
            "$$85.0\\text{ kJ}$$, $$11.2\\text{ g}$$, tindak balas itu menyerap haba secara keseluruhan, yang dibekalkan oleh magnesium yang terbakar",
        },
      ],
    },
  },
};

export default item;
