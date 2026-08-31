import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "supporting-detail",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Its blue cover allowed the gardeners to identify it among the other records.",
        },
        {
          isCorrect: false,
          label:
            "Mina's repeated search showed that the notebook was the only source of weather information.",
        },
        {
          isCorrect: false,
          label:
            "Arif's copied diagram replaced the need to consult the notebook's earlier observations.",
        },
        {
          isCorrect: false,
          label:
            "The storage box near the stairs made every record immediately available to the gardeners.",
        },
        {
          isCorrect: true,
          label:
            "Gardeners used its records to decide when to cover young plants.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
