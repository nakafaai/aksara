import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "supporting-detail",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The timetable above Niko's desk",
        },
        {
          isCorrect: true,
          label: "Heavy rain and a route without streetlights",
        },
        {
          isCorrect: false,
          label: "The bus normally arriving at 9:20",
        },
        {
          isCorrect: false,
          label: "The receptionist answering the phone",
        },
        {
          isCorrect: false,
          label: "The notes added the next day",
        },
      ],
    },
  },
  stimulusKey: "last-bus",
};

export default item;
