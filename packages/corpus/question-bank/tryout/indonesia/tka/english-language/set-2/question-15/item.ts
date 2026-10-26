import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "last-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The story is realistic mainly because every problem is resolved by one official website.",
        },
        {
          correct: false,
          label:
            "The story becomes unrealistic when Niko keeps the timetable after the disruption.",
        },
        {
          correct: true,
          label:
            "Each source provides only information it could realistically know, so the characters combine them.",
        },
        {
          correct: false,
          label:
            "The exact time and named location make every event a verified historical report.",
        },
        {
          correct: false,
          label:
            "The story becomes fantasy when Niko reads the timetable as if its numbers could explain the delay.",
        },
      ],
    },
  },
};

export default item;
