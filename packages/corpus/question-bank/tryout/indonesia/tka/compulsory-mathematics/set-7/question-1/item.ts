import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "bunyi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$83\\text{ dB}$$",
        },
        {
          correct: false,
          label: "$$84{,}5\\text{ dB}$$",
        },
        {
          correct: false,
          label: "$$86\\text{ dB}$$",
        },
        {
          correct: true,
          label: "$$87{,}8\\text{ dB}$$",
        },
        {
          correct: false,
          label: "$$89\\text{ dB}$$",
        },
      ],
    },
  },
};

export default item;
