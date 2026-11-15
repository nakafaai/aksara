import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "clever-hans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The software may be responding to the type of camera rather than to illness, so the hospital should stop using the bedside camera.",
        },
        {
          correct: false,
          label:
            "The software is remarkable in the way Hans was, so it should be used as it is.",
        },
        {
          correct: false,
          label:
            "The researchers must have signalled the answers on purpose, so they should be replaced.",
        },
        {
          correct: true,
          label:
            "The software may be responding to the type of camera rather than to illness, so it should be tested on photos in which the camera gives no clue to the answer.",
        },
        {
          correct: false,
          label:
            "The software may be responding to the type of camera rather than to illness, so it should be retrained on more photos from the same bedside camera.",
        },
      ],
    },
  },
};

export default item;
