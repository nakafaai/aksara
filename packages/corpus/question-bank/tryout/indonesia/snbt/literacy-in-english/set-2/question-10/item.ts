import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "right-repair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A rule that only the original manufacturer may replace phone batteries",
        },
        {
          correct: false,
          label:
            "A tax on independent repair shops to fund manufacturers' service centres",
        },
        {
          correct: false,
          label: "A ban on selling any device that contains a glued battery",
        },
        {
          correct: true,
          label:
            "A requirement that phone makers publish repair manuals and sell spare parts to anyone at a fair price",
        },
        {
          correct: false,
          label:
            "A law requiring owners to keep every device for at least five years",
        },
      ],
    },
  },
};

export default item;
