import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Printed timetables should be replaced whenever a live service page is available.",
        },
        {
          correct: false,
          label: "Cycling in a storm is the fastest solution.",
        },
        {
          correct: false,
          label:
            "Phone battery level is unrelated to the usefulness of the service information.",
        },
        {
          correct: true,
          label:
            "Use current information and choose a safe action during a disruption.",
        },
        {
          correct: false,
          label: "Road closures make clinic staff unreliable.",
        },
      ],
    },
  },
  stimulus: "last-bus",
};

export default item;
