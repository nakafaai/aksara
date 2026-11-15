import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "rain-gauge",
  versions: {
    en: {
      columns: [
        "Follows the instructions",
        "Breaks the instructions",
        "Not covered",
      ],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Setting the gauge $$3$$ metres from a wall that is $$4$$ metres tall",
        },
        {
          column: 1,
          label:
            "Setting the gauge $$5$$ metres from a tree that is $$5$$ metres tall",
        },
        {
          column: 1,
          label:
            "Reading the gauge at 7:00 and then pouring water out down to the zero line",
        },
        {
          column: 3,
          label: "Painting the bottle black",
        },
        {
          column: 2,
          label: "Reading the level by looking down into the bottle from above",
        },
        {
          column: 2,
          label: "Using a bottle that narrows towards the top",
        },
      ],
    },
  },
};

export default item;
