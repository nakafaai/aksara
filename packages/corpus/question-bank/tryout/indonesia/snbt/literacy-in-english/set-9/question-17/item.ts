import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "map-projection",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Comparing the land areas of countries that lie far apart in latitude",
        },
        {
          correct: true,
          label:
            "Plotting a course that a ship can follow on one compass heading",
        },
        {
          correct: false,
          label:
            "Finding the shortest route between two distant cities with a ruler",
        },
        {
          correct: false,
          label:
            "Showing the true outline of a whole continent close to a pole",
        },
        {
          correct: true,
          label:
            "Zooming into any city without bending the angles of its street corners",
        },
      ],
    },
  },
};

export default item;
