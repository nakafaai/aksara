import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{N}_2$$, with 6 shared electrons and 2 lone pairs",
        },
        {
          correct: false,
          label: "$$\\text{NH}_3$$, with 6 shared electrons and 1 lone pair",
        },
        {
          correct: false,
          label: "$$\\text{CO}_2$$, with 4 shared electrons and 4 lone pairs",
        },
        {
          correct: true,
          label: "$$\\text{CO}_2$$, with 8 shared electrons and 4 lone pairs",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{N}_2$$, dengan 6 elektron dikongsi dan 2 pasangan elektron bebas",
        },
        {
          correct: false,
          label:
            "$$\\text{NH}_3$$, dengan 6 elektron dikongsi dan 1 pasangan elektron bebas",
        },
        {
          correct: false,
          label:
            "$$\\text{CO}_2$$, dengan 4 elektron dikongsi dan 4 pasangan elektron bebas",
        },
        {
          correct: true,
          label:
            "$$\\text{CO}_2$$, dengan 8 elektron dikongsi dan 4 pasangan elektron bebas",
        },
      ],
    },
  },
};

export default item;
