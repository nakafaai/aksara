import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "emas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$12{,}16\\%$$",
        },
        {
          correct: false,
          label: "$$10{,}16\\%$$",
        },
        {
          correct: false,
          label: "$$9{,}85\\%$$",
        },
        {
          correct: false,
          label: "$$8{,}16\\%$$",
        },
        {
          correct: false,
          label: "$$4{,}8\\%$$",
        },
      ],
    },
  },
};

export default item;
