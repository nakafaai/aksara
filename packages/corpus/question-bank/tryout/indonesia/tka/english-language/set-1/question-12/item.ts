import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Paper notes are useless and gardens need no weather data.",
        },
        {
          isCorrect: false,
          label: "Storms only arrive when a notebook is missing.",
        },
        {
          isCorrect: false,
          label: "Digital copies should replace every field observation.",
        },
        {
          isCorrect: true,
          label:
            "Protect useful records and avoid blaming someone without evidence.",
        },
        {
          isCorrect: false,
          label: "Friends should never borrow diagrams from one another.",
        },
      ],
    },
  },
  stimulusKey: "weather-notebook",
};

export default item;
