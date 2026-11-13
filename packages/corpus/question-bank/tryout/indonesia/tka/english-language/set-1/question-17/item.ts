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
            "The plant whose stems swell after a flood is the one that keeps salt inside itself.",
        },
        {
          correct: false,
          label:
            "The middle marsh is flooded more often than the bare mudflat.",
        },
        {
          correct: false,
          label:
            "Glasswort grows around the edges of the white-crusted salt pans.",
        },
        {
          correct: true,
          label:
            "Sea lavender and the low-marsh grass get rid of salt in the same way.",
        },
        {
          correct: false,
          label:
            "The ground drops by about $$1$$ m between the car park and the mudflat.",
        },
      ],
    },
  },
};

export default item;
