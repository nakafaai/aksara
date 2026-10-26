import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "supporting-detail",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Its blue cover allowed the gardeners to identify it among the other records.",
        },
        {
          correct: false,
          label:
            "Mina's repeated search showed that the notebook was the only source of weather information.",
        },
        {
          correct: false,
          label:
            "Arif's copied diagram replaced the need to consult the notebook's earlier observations.",
        },
        {
          correct: false,
          label:
            "The storage box near the stairs made every record immediately available to the gardeners.",
        },
        {
          correct: true,
          label:
            "Gardeners used its records to decide when to cover young plants.",
        },
      ],
    },
  },
  stimulus: "weather-notebook",
};

export default item;
