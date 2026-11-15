import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "temple-moss",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kelompok I dan III, dengan selisih $$0{,}5$$ mm",
        },
        {
          correct: false,
          label: "kelompok II dan III, dengan selisih $$0{,}2$$ mm",
        },
        {
          correct: false,
          label: "kelompok I dan II, dengan selisih $$0{,}5$$ mm",
        },
        {
          correct: true,
          label: "kelompok I dan II, dengan selisih $$0{,}3$$ mm",
        },
        {
          correct: false,
          label: "kelompok II dan III, dengan selisih $$0{,}3$$ mm",
        },
      ],
    },
  },
};

export default item;
