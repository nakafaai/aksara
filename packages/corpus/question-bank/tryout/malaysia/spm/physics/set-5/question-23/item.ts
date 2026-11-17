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
          label: "$$164\\text{ N}$$, and more work per metre at $$53^\\circ$$",
        },
        {
          correct: true,
          label: "$$129\\text{ N}$$, and less work per metre at $$53^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$107\\text{ N}$$, and the same work per metre at both angles",
        },
        {
          correct: false,
          label: "$$129\\text{ N}$$, and more work per metre at $$53^\\circ$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$164\\text{ N}$$, dan lebih banyak kerja setiap meter pada $$53^\\circ$$",
        },
        {
          correct: true,
          label:
            "$$129\\text{ N}$$, dan kurang kerja setiap meter pada $$53^\\circ$$",
        },
        {
          correct: false,
          label:
            "$$107\\text{ N}$$, dan kerja yang sama setiap meter pada kedua-dua sudut",
        },
        {
          correct: false,
          label:
            "$$129\\text{ N}$$, dan lebih banyak kerja setiap meter pada $$53^\\circ$$",
        },
      ],
    },
  },
};

export default item;
