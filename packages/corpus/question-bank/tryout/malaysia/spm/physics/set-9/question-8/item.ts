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
          correct: true,
          label: "$$103\\text{ N}$$, and $$0.85\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$240\\text{ N}$$, and $$3.5\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$103\\text{ N}$$, and $$6.1\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$103\\text{ N}$$, and $$3.5\\text{ km s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$103\\text{ N}$$, dan $$0.85\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$240\\text{ N}$$, dan $$3.5\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$103\\text{ N}$$, dan $$6.1\\text{ km s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$103\\text{ N}$$, dan $$3.5\\text{ km s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
