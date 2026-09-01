import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The story is realistic mainly because every problem is resolved by one official website.",
        },
        {
          isCorrect: false,
          label:
            "The story becomes unrealistic when Niko keeps the timetable after the disruption.",
        },
        {
          isCorrect: true,
          label:
            "Each source provides only information it could realistically know, so the characters combine them.",
        },
        {
          isCorrect: false,
          label:
            "The exact time and named location make every event a verified historical report.",
        },
        {
          isCorrect: false,
          label:
            "The story becomes fantasy when Niko reads the timetable as if its numbers could explain the delay.",
        },
      ],
    },
  },
  stimulusKey: "last-bus",
};

export default item;
