import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "speed-cameras",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Injury crashes at the camera sites fell after the cameras were installed.",
        },
        {
          correct: false,
          label:
            "The cameras' effect at the sites is about as large as the crash counts there suggest.",
        },
        {
          correct: false,
          label:
            "Comparing the sites with the whole city shows what the cameras achieved.",
        },
        {
          correct: true,
          label:
            "Even without cameras, the camera sites would probably have fallen by more than the city as a whole.",
        },
        {
          correct: false,
          label:
            "Once chance is allowed for, the cameras turn out to have had no effect on crashes.",
        },
      ],
    },
  },
};

export default item;
