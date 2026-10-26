import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "club-choices",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25\\%$$",
        },
        {
          correct: false,
          label: "$$31{,}25\\%$$",
        },
        {
          correct: true,
          label: "$$35\\%$$",
        },
        {
          correct: false,
          label: "$$42{,}5\\%$$",
        },
        {
          correct: false,
          label: "$$50\\%$$",
        },
      ],
    },
  },
};

export default item;
