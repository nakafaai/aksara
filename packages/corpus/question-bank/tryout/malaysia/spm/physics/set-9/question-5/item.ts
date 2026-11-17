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
          label: "After $$1.0\\text{ s}$$, at $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "After $$3.3\\text{ s}$$, at $$6.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "After $$1.7\\text{ s}$$, at $$13\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "After $$1.7\\text{ s}$$, at $$3.5\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Selepas $$1.0\\text{ s}$$, pada $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "Selepas $$3.3\\text{ s}$$, pada $$6.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "Selepas $$1.7\\text{ s}$$, pada $$13\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "Selepas $$1.7\\text{ s}$$, pada $$3.5\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
