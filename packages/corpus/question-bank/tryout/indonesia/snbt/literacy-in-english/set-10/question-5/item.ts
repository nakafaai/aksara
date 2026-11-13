import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "ant-foraging",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Villagers keep walking a worn path to the well after a shorter one is cleared, since each walks where most others walk, a habit that prevents wrong turns while the well stays put.",
        },
        {
          correct: false,
          label:
            "A hiker compares two trails on a map, misreads the scale, picks the longer trail, and then stays on it out of pride even after noticing the mistake.",
        },
        {
          correct: false,
          label:
            "A shop keeps buying from a slow supplier because a contract it signed several years ago cannot be cancelled before its end date.",
        },
        {
          correct: false,
          label:
            "A crowd leaving a stadium first splits evenly between two exits, then gradually drifts toward the exit whose queue is moving faster.",
        },
        {
          correct: false,
          label:
            "A courier firm redraws all its routes every morning from fresh traffic data, so that its vans are never stuck on a slow road for long.",
        },
      ],
    },
  },
};

export default item;
