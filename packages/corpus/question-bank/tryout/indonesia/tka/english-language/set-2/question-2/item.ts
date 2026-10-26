import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "They share a shelf near the entrance, before the narrow central aisle.",
        },
        {
          correct: false,
          label:
            "They are kept beside the inspection tray so staff can approve each reader before lending them.",
        },
        {
          correct: false,
          label:
            "They are stored in sealed boxes at the rear and requested through the portable router.",
        },
        {
          correct: false,
          label:
            "They face outward with the children's books at the far end of the central aisle.",
        },
        {
          correct: false,
          label:
            "They remain at the temporary landing so the cabin has more room during the dry season.",
        },
      ],
    },
  },
  stimulus: "library-boat",
};

export default item;
