import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "characterization",
  },
  stimulus: "clinic-interpreter",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "He answered it himself because it concerned his own conduct rather than his illness.",
        },
        {
          column: 2,
          label:
            "He answered it himself because he did not trust the narrator to translate it correctly.",
        },
        {
          column: 1,
          label:
            "His answer was probably meant to protect how the doctor saw him.",
        },
        {
          column: 2,
          label:
            "He felt that hearing the doctor's news through the narrator made it harder to bear.",
        },
        {
          column: 2,
          label:
            "He plans to tell the doctor the truth about the tablets at his next visit.",
        },
      ],
    },
  },
};

export default item;
