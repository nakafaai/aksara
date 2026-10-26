import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "supporting-detail",
  },
  stimulus: "last-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The timetable above Niko's desk",
        },
        {
          correct: false,
          label: "The bus normally arriving at 9:20",
        },
        {
          correct: false,
          label: "The receptionist answering the phone",
        },
        {
          correct: false,
          label: "The notes added the next day",
        },
        {
          correct: true,
          label: "Heavy rain and a route without streetlights",
        },
      ],
    },
  },
};

export default item;
