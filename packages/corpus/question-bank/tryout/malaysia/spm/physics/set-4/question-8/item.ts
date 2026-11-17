import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Height $$4.2 \\times 10^7\\text{ m}$$, speed $$3.1\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Height $$3.6 \\times 10^7\\text{ m}$$, speed $$7.9\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Height $$3.6 \\times 10^7\\text{ m}$$, speed $$2.6\\text{ km s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "Height $$3.6 \\times 10^7\\text{ m}$$, speed $$3.1\\text{ km s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ketinggian $$4.2 \\times 10^7\\text{ m}$$, laju $$3.1\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Ketinggian $$3.6 \\times 10^7\\text{ m}$$, laju $$7.9\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Ketinggian $$3.6 \\times 10^7\\text{ m}$$, laju $$2.6\\text{ km s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "Ketinggian $$3.6 \\times 10^7\\text{ m}$$, laju $$3.1\\text{ km s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
