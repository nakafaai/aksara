import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "mpemba-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Yes, because the 2016 study found no sign that hot water froze before cold water.",
        },
        {
          correct: true,
          label:
            "Not necessarily, because the 1969 paper reported hot water freezing first, while the 2016 study timed only cooling to zero degrees, a different event.",
        },
        {
          correct: false,
          label:
            "Yes, because the 2016 study showed that the thermometers in the 1969 experiment had been placed wrongly.",
        },
        {
          correct: false,
          label:
            "No, because both studies found that hot water reached zero degrees before cold water.",
        },
        {
          correct: false,
          label:
            "Not necessarily, because the 1969 paper tested ice-cream mixtures, while the 2016 study tested pure water.",
        },
      ],
    },
  },
};

export default item;
