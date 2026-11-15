import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "bus-punctuality",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Northline $$80\\%$$ and Southway $$75\\%$$, so Northline was ahead overall as well as on each kind of route.",
        },
        {
          correct: false,
          label:
            "Northline $$74\\%$$ and Southway $$81\\%$$, so Southway was ahead on each kind of route as well as overall.",
        },
        {
          correct: true,
          label:
            "Northline $$74\\%$$ and Southway $$81\\%$$, even though Northline was ahead on each kind of route.",
        },
        {
          correct: false,
          label:
            "Northline $$70\\%$$ and Southway $$85\\%$$, so each operator was ahead on the kind of route it ran most.",
        },
        {
          correct: false,
          label:
            "Northline $$81\\%$$ and Southway $$74\\%$$, so the newspaper reversed the two operators.",
        },
      ],
    },
  },
};

export default item;
