import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "museum-visits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Comparing July to December with January to June of the same year",
        },
        {
          correct: false,
          label:
            "Comparing the number of school groups with the number of families",
        },
        {
          correct: false,
          label:
            "Comparing the museum's visitors with the art museum's visitors in August",
        },
        {
          correct: false,
          label:
            "Comparing how long adults stayed with how long families stayed",
        },
        {
          correct: true,
          label:
            "Comparing July to December with July to December of the year before",
        },
      ],
    },
  },
};

export default item;
