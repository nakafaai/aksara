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
            "It was unreliable because it described the route rather than Niko's individual trip.",
        },
        {
          isCorrect: false,
          label:
            "It showed that the printed timetable was no longer useful for that journey.",
        },
        {
          isCorrect: true,
          label:
            "It was useful for the road closure, but incomplete about Niko's mother's exact situation.",
        },
        {
          isCorrect: false,
          label:
            "It was precise enough to determine when the hospital shuttle would arrive.",
        },
        {
          isCorrect: false,
          label:
            "It made contacting the clinic unnecessary once the road closure was known.",
        },
      ],
    },
  },
  stimulusKey: "last-bus",
};

export default item;
