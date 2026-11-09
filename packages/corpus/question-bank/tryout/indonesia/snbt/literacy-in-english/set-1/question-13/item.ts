import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "campus-commute",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "More than half of the surveyed students travel mainly by public bus or by train.",
        },
        {
          column: 1,
          label:
            "Students who cycle have a shorter average trip than students who travel by car or motorbike.",
        },
        {
          column: 2,
          label:
            "The survey shows that secure bicycle parking would reduce lateness by 40 percent.",
        },
        {
          column: 1,
          label:
            "The lateness figures may not match the university's attendance records.",
        },
      ],
    },
  },
};

export default item;
