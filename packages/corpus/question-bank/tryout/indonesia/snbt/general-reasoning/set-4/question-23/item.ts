import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "pelatihan",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$59{,}4\\%$$" },
        { correct: true, label: "$$75{,}0\\%$$" },
        { correct: false, label: "$$76{,}5\\%$$" },
        { correct: false, label: "$$79{,}3\\%$$" },
        { correct: false, label: "$$80{,}0\\%$$" },
      ],
    },
  },
};

export default item;
