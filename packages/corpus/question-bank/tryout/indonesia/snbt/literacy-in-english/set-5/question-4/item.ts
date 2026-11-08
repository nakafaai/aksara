import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "placebo-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Naloxone is itself a powerful painkiller for patients after dental surgery.",
        },
        {
          correct: false,
          label:
            "Patients recovering from dental surgery do not feel any real pain at all.",
        },
        {
          correct: true,
          label:
            "Part of the relief a placebo brings depends on chemicals the body itself releases.",
        },
        {
          correct: false,
          label:
            "The placebo pills in the experiment secretly contained opioid drugs.",
        },
        {
          correct: false,
          label:
            "Expectation has little or no effect on what happens in the brain.",
        },
      ],
    },
  },
};

export default item;
