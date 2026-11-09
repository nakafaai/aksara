import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "meat-survey",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A second survey asking the same people whether they enjoy eating meat",
        },
        {
          correct: false,
          label:
            "The opinions of doctors about how much meat adults should eat",
        },
        {
          correct: false,
          label:
            "The number of vegetarian restaurants that opened during the year",
        },
        {
          correct: false,
          label: "A list of the reasons respondents gave for eating less meat",
        },
        {
          correct: true,
          label: "Records of each household's meat purchases over both years",
        },
      ],
    },
  },
};

export default item;
