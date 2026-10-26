import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Defining *actionable information* proves that the alert will work equally well during a real flood.",
        },
        {
          correct: false,
          label:
            "The definition makes the measured comparison and consultation unnecessary.",
        },
        {
          correct: false,
          label:
            "The term applies to any detailed flood description, even when no next action is stated.",
        },
        {
          correct: true,
          label:
            "The definition explains why the safe route is essential: the message must tell households what to do and why the stated flood depth makes that action necessary.",
        },
        {
          correct: false,
          label:
            "The definition shows that naming the street alone is enough, even if the alert omits the safe route.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
