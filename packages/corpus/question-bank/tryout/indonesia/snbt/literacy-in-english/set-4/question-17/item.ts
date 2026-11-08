import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "antikythera",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "They allowed scientists to clean the corrosion from the gears.",
        },
        {
          correct: false,
          label: "They proved the device had been made by a famous scholar.",
        },
        {
          correct: false,
          label:
            "They showed that the ship sank because of the mechanism's weight.",
        },
        {
          correct: true,
          label:
            "They revealed gears and text hidden inside the fused fragments.",
        },
        {
          correct: false,
          label: "They were used to rebuild the device in its original bronze.",
        },
      ],
    },
  },
};

export default item;
