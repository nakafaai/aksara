import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "scooter-pilot",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The lower speed limit cut the total number of injuries in half within a single month.",
        },
        {
          correct: false,
          label:
            "Adding 300 scooters caused the injury rate to rise in month 3.",
        },
        {
          correct: false,
          label:
            "Shared scooters became more dangerous the longer the pilot ran.",
        },
        {
          correct: false,
          label:
            "Riders stopped using the scooters after the speed limit was lowered.",
        },
        {
          correct: true,
          label:
            "Injuries per trip fell over the pilot, though the reasons are not yet clear.",
        },
      ],
    },
  },
};

export default item;
