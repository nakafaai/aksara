import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "city-birdsong",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It proves that street lights have no effect on any bird species.",
        },
        {
          correct: false,
          label:
            "It shows that robins can see better at night than during the day.",
        },
        {
          correct: false,
          label:
            "It means that robins sing only at night in every British city.",
        },
        {
          correct: true,
          label:
            "It challenges the common explanation that lighting causes night singing.",
        },
        {
          correct: false,
          label:
            "It suggests that daytime noise might be louder in Britain than elsewhere.",
        },
      ],
    },
  },
};

export default item;
