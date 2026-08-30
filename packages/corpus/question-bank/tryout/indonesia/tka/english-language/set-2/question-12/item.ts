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
          isCorrect: true,
          label:
            "Use current information and choose a safe action during a disruption.",
        },
        {
          isCorrect: false,
          label: "Printed timetables should always be thrown away.",
        },
        {
          isCorrect: false,
          label: "Cycling in a storm is the fastest solution.",
        },
        {
          isCorrect: false,
          label: "A phone battery never affects communication.",
        },
        {
          isCorrect: false,
          label: "Road closures make clinic staff unreliable.",
        },
      ],
    },
  },
  stimulusKey: "last-bus",
};

export default item;
