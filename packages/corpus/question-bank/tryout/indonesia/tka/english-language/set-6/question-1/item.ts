import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "water-rota",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "None, because one tank holds enough for four days",
        },
        {
          correct: true,
          label: "$$200$$ litres, costing $$\\text{Rp}50{,}000$$",
        },
        {
          correct: false,
          label: "$$150$$ litres, costing $$\\text{Rp}37{,}500$$",
        },
        {
          correct: false,
          label: "$$200$$ litres, costing $$\\text{Rp}10{,}000$$",
        },
        {
          correct: false,
          label: "$$200$$ litres, costing $$\\text{Rp}1{,}000{,}000$$",
        },
      ],
    },
  },
};

export default item;
