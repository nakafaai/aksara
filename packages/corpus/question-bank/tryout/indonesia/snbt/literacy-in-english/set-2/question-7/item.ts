import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "speed-cameras",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Comparing the camera sites with the city as a whole measures what the cameras achieved.",
        },
        {
          column: 1,
          label:
            "Injury crashes at the camera sites fell after the cameras went in.",
        },
        {
          column: 2,
          label:
            "The $$60$$ new sites should wait until the first $$40$$ have been measured properly.",
        },
        {
          column: 1,
          label:
            "The cameras probably prevented at least some injury crashes at the sites.",
        },
        {
          column: 2,
          label:
            "The fall at the camera sites is larger than the cameras alone would explain.",
        },
      ],
    },
  },
};

export default item;
