import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "synthesis",
  },
  stimulus: "flood-kitchen",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The writer's memory of how much planning a food box needs comes from the writer's own job at the packing table.",
        },
        {
          correct: true,
          label:
            "Some of the boxes that the motorbike team delivered were packed by volunteers like the writer.",
        },
        {
          correct: false,
          label:
            "The writer's brother carried mud out of houses on the first morning.",
        },
        {
          correct: false,
          label: "The flood lasted only one day before the water went down.",
        },
      ],
    },
  },
};

export default item;
