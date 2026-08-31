import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "They share a shelf near the entrance, before the narrow central aisle.",
        },
        {
          isCorrect: false,
          label:
            "They are kept beside the inspection tray so staff can approve each reader before lending them.",
        },
        {
          isCorrect: false,
          label:
            "They are stored in sealed boxes at the rear and requested through the portable router.",
        },
        {
          isCorrect: false,
          label:
            "They face outward with the children's books at the far end of the central aisle.",
        },
        {
          isCorrect: false,
          label:
            "They remain at the temporary landing so the cabin has more room during the dry season.",
        },
      ],
    },
  },
  stimulusKey: "library-boat",
};

export default item;
