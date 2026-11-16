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
          label: "$$\\text{N}_2$$, because it also holds a multiple bond",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_2\\text{H}_2$$, because it also holds a triple bond",
        },
        {
          correct: false,
          label:
            "$$\\text{H}_2\\text{O}$$, because it holds only two lone pairs",
        },
        {
          correct: true,
          label:
            "$$\\text{HCN}$$, with $$8$$ shared electrons and one lone pair",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{N}_2$$, kerana ia juga mempunyai ikatan berganda",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_2\\text{H}_2$$, kerana ia juga mempunyai ikatan ganda tiga",
        },
        {
          correct: false,
          label:
            "$$\\text{H}_2\\text{O}$$, kerana ia hanya mempunyai dua pasangan elektron bebas",
        },
        {
          correct: true,
          label:
            "$$\\text{HCN}$$, dengan $$8$$ elektron dikongsi dan satu pasangan elektron bebas",
        },
      ],
    },
  },
};

export default item;
