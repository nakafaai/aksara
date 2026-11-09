import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "screens-sleep",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            'More students in the "more than 3 hours" group than in the "1 to 2 hours" group often felt sleepy.',
        },
        {
          column: 2,
          label:
            "The survey measured screen time with tracking apps on students' phones.",
        },
        {
          column: 1,
          label:
            "The largest group of students reported 1 to 2 hours of screen time after 8 p.m.",
        },
        {
          column: 1,
          label:
            "On average, students with more than 3 hours slept 1.7 hours less than those with less than 1 hour.",
        },
      ],
    },
  },
};

export default item;
