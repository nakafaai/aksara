import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  responses: {
    en: {
      categories: [
        "Adjusting the image",
        "Making the projector",
        "Setting it up",
      ],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 3,
          label: "Holding the foil card above your shoulder",
        },
        {
          correctCategoryOrder: 1,
          label: "Moving the screen farther from the foil",
        },
        {
          correctCategoryOrder: 2,
          label: "Pushing a pin through the center of the foil",
        },
      ],
    },
  },
  stimulusKey: "pinhole-projector",
};

export default item;
