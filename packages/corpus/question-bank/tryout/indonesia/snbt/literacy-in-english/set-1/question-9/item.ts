import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "a ranking of sports by the calories they burn.",
        },
        {
          correct: true,
          label: "when and how to seek additional support for stress.",
        },
        {
          correct: false,
          label: "replacing balanced meals with dietary supplements.",
        },
        {
          correct: false,
          label: "ways to eliminate every source of stress.",
        },
        {
          correct: false,
          label: "the history of international nutrition guidance.",
        },
      ],
    },
  },
};

export default item;
