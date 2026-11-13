import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "crow-tools",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "One bird's results with the wire were made to support a large claim about animal reasoning, more than they could later bear.",
        },
        {
          correct: false,
          label:
            "The wire had to be stiff enough to lift a bucket of food that was heavy for a bird of Betty's size.",
        },
        {
          correct: false,
          label:
            "The wire result was so solid that it has supported nearly every later study of tool use in crows.",
        },
        {
          correct: false,
          label:
            "Betty's results were treated as a fluke at first, and later work showed that the doubters were right.",
        },
        {
          correct: false,
          label:
            "Betty had to reuse the same short wire in trial after trial, which put a strain on the equipment.",
        },
      ],
    },
  },
};

export default item;
