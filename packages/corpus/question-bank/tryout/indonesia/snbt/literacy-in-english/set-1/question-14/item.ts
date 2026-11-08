import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "campus-commute",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "the average trip time of students who walk to campus.",
        },
        {
          correct: false,
          label: "the cost of running the station shuttle for one year.",
        },
        {
          correct: false,
          label: "how many bus routes currently serve the campus.",
        },
        {
          correct: false,
          label: "whether train users would prefer a shuttle to walking.",
        },
        {
          correct: true,
          label: "how many non-cyclists live close enough to ride to campus.",
        },
      ],
    },
  },
};

export default item;
