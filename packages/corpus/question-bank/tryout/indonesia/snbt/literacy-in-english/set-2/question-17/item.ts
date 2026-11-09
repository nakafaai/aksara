import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Removing walls always increases face-to-face collaboration.",
        },
        {
          correct: false,
          label: "Open layouts may reduce visual and acoustic privacy.",
        },
        {
          correct: false,
          label:
            "Private offices received the highest satisfaction ratings in one study.",
        },
        {
          correct: false,
          label: "The two field studies found more electronic communication.",
        },
        {
          correct: false,
          label: "The best layout may depend on tasks and communication needs.",
        },
      ],
    },
  },
};

export default item;
