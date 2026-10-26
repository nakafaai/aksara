import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  versions: {
    en: {
      columns: [
        "Adjusting the image",
        "Making the projector",
        "Setting it up",
      ],
      kind: "matrix",
      statements: [
        {
          column: 3,
          label: "Holding the foil card above your shoulder",
        },
        {
          column: 1,
          label: "Moving the screen farther from the foil",
        },
        {
          column: 2,
          label: "Pushing a pin through the center of the foil",
        },
      ],
    },
  },
  stimulus: "pinhole-projector",
};

export default item;
