import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "class-mural",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A teacher paints a mural behind the canteen while students watch.",
        },
        {
          correct: true,
          label:
            "A class plans, prepares, and paints a mural, and the finished wall changes how students use the area.",
        },
        {
          correct: false,
          label: "Students vote to paint a picture of a future city.",
        },
        {
          correct: false,
          label: "A class repairs cracks in a wall and paints it white.",
        },
        {
          correct: false,
          label:
            "The canteen owner asks students to eat lunch in their classrooms.",
        },
      ],
    },
  },
};

export default item;
