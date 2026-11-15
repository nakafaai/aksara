import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "measles-coverage",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The number of unvaccinated children in each school, not only in each district",
        },
        {
          correct: false,
          label:
            "Each district's coverage figure, since a district that has reached $$95\\%$$ needs no team",
        },
        {
          correct: true,
          label: "Which communities and schools the outbreak's cases came from",
        },
        {
          correct: false,
          label:
            "The number of children in each district, since a larger district has more children to protect",
        },
        {
          correct: false,
          label:
            "The provincial coverage figure for each of the previous five years",
        },
      ],
    },
  },
};

export default item;
