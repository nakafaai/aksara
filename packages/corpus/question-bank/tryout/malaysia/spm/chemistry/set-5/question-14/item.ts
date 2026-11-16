import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.48\\text{ g}$$, and the filtrate is colourless",
        },
        {
          correct: false,
          label: "$$2.23\\text{ g}$$, and the filtrate is colourless",
        },
        {
          correct: true,
          label:
            "$$2.23\\text{ g}$$, and the filtrate is pale blue because copper(II) ions are left over",
        },
        {
          correct: false,
          label: "$$2.48\\text{ g}$$, and the filtrate is pale blue",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.48\\text{ g}$$, dan hasil turasan tidak berwarna",
        },
        {
          correct: false,
          label: "$$2.23\\text{ g}$$, dan hasil turasan tidak berwarna",
        },
        {
          correct: true,
          label:
            "$$2.23\\text{ g}$$, dan hasil turasan biru muda kerana ion kuprum(II) berlebihan",
        },
        {
          correct: false,
          label: "$$2.48\\text{ g}$$, dan hasil turasan biru muda",
        },
      ],
    },
  },
};

export default item;
