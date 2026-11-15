import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "text-fit",
  },
  stimulus: "bridge-count",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Nobody checked the table against the tally sheets, since the totals only ever went up.",
        },
        {
          correct: false,
          label:
            "Yosef checked each figure against the camera on the bridge as he wrote it.",
        },
        {
          correct: true,
          label: "I looked over Yosef's table at 9:00 and found nothing wrong.",
        },
        {
          correct: false,
          label:
            "We all expected the busiest hour to be 6:00 to 7:00, and the table proved us right.",
        },
        {
          correct: true,
          label: "The camera on the bridge had been put up the month before.",
        },
      ],
    },
  },
};

export default item;
