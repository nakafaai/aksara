import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "cicilan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$15{,}2\\%$$",
        },
        {
          correct: false,
          label: "$$17{,}5\\%$$",
        },
        {
          correct: false,
          label: "$$18\\%$$",
        },
        {
          correct: true,
          label: "$$20\\%$$",
        },
        {
          correct: false,
          label: "$$23{,}75\\%$$",
        },
      ],
    },
  },
};

export default item;
