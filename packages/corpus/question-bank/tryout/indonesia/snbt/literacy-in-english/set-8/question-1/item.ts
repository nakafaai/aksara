import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "city-birdsong",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "City birds have stopped singing because traffic makes their songs useless.",
        },
        {
          correct: false,
          label:
            "Street lighting is the main reason why city robins sing at night.",
        },
        {
          correct: true,
          label:
            "Birds adjust their songs to city noise, but these changes may carry costs.",
        },
        {
          correct: false,
          label:
            "Great tits in quiet woods sing louder than great tits in noisy cities.",
        },
        {
          correct: false,
          label: "Lockdowns permanently changed the way that city birds sing.",
        },
      ],
    },
  },
};

export default item;
