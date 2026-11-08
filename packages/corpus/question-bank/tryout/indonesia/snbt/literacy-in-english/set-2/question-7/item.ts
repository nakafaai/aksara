import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "right-repair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A shop cannot buy a replacement battery because the company sells parts only to its own service centres.",
        },
        {
          correct: true,
          label:
            "A phone shows a warning and disables a feature after its screen is replaced with a genuine screen taken from an identical phone.",
        },
        {
          correct: false,
          label:
            "A washing machine cannot be opened because its screws need a special tool.",
        },
        {
          correct: false,
          label:
            "A repair manual is available only to technicians who pay a yearly fee.",
        },
        {
          correct: false,
          label:
            "A battery is glued so firmly that removing it risks breaking the case.",
        },
      ],
    },
  },
};

export default item;
