import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "boardwalk",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The tall grass of the low marsh carries air down to its roots through hollow channels in its stems.",
        },
        {
          correct: false,
          label:
            "Glasswort gets rid of salt through tiny glands on its leaves.",
        },
        {
          correct: false,
          label:
            "Sea lavender grows in the middle of the white-crusted salt pans.",
        },
        {
          correct: true,
          label:
            "The mudflat is covered by the tide twice a day, like the low marsh, but for longer.",
        },
        {
          correct: false,
          label:
            "The boardwalk drops by about $$1$$ m between the car park and the mudflat.",
        },
      ],
    },
  },
};

export default item;
