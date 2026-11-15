import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "measles-coverage",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Northgate, the district with the most cases, had the lowest coverage in the province.",
        },
        {
          correct: false,
          label:
            "Most of the children who caught measles in Riverside and Hillcrest had received both doses of the vaccine.",
        },
        {
          correct: false,
          label:
            "Most of the children who caught measles in Eastport had received at least one dose of the vaccine.",
        },
        {
          correct: true,
          label:
            "Most of the children who caught measles in Northgate and Eastport had received both doses of the vaccine.",
        },
        {
          correct: false,
          label:
            "The private school in Eastport had more unvaccinated pupils than any other school in the district.",
        },
      ],
    },
  },
};

export default item;
