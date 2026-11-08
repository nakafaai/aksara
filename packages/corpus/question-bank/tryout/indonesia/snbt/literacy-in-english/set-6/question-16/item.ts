import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "railway-time",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Trains could only run safely during the hours of daylight.",
        },
        {
          correct: false,
          label:
            "Passengers wanted their watches to match the sun more closely.",
        },
        {
          correct: false,
          label:
            "Parliament ordered the railways to use Greenwich time in 1840.",
        },
        {
          correct: true,
          label:
            "Faster journeys meant several local times in one timetable caused confusion.",
        },
        {
          correct: false,
          label:
            "Towns in the west might have refused to let trains from London stop at their stations.",
        },
      ],
    },
  },
};

export default item;
