import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "tambora-1816",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "They believed the cold was caused by Mary Shelley's novel.",
        },
        {
          correct: false,
          label:
            "Scientists had already proved that volcanoes warm the planet.",
        },
        {
          correct: false,
          label:
            "Tambora was too small an eruption to be noticed by anyone outside Indonesia.",
        },
        {
          correct: true,
          label:
            "News travelled slowly, and the science to make the link did not yet exist.",
        },
        {
          correct: false,
          label:
            "Ice cores showed that the sulphate came from a different volcano.",
        },
      ],
    },
  },
};

export default item;
