import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "bird-compass",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Birds in cages tried to head in the seasonal direction without seeing the sky.",
        },
        {
          correct: true,
          label:
            "Robins turned around when only the vertical part of the field was reversed.",
        },
        {
          correct: false,
          label:
            "Magnetic field lines run almost parallel to the ground near the equator.",
        },
        {
          correct: false,
          label: "Songbirds migrating to Africa usually travel at night.",
        },
        {
          correct: false,
          label:
            "Iron-containing cells in the beak were found to be immune cells.",
        },
      ],
    },
  },
};

export default item;
