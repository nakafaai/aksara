import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "substitute-teacher",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Fantasy, because the old maps carry the students back in time.",
        },
        {
          correct: false,
          label:
            "Fantasy, because a compass cannot show directions inside a classroom.",
        },
        {
          correct: false,
          label:
            "Fantasy, because a substitute teacher is not allowed to teach geography.",
        },
        {
          correct: true,
          label:
            "Realistic, because a substitute teacher using hands-on activities is something that happens in real schools.",
        },
        {
          correct: false,
          label:
            "Legend, because the story explains how the city's streets got their names.",
        },
      ],
    },
  },
};

export default item;
