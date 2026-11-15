import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "school-start",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Teenagers' body clocks make an early school start hard for them.",
        },
        {
          column: 2,
          label:
            "Every high school should start at 8:30 or later, whatever it costs.",
        },
        {
          column: 2,
          label:
            "Moving to 8:30 would give this district's students about $$34$$ more minutes of sleep.",
        },
        {
          column: 1,
          label: "A later start would be good for high-school students.",
        },
        {
          column: 2,
          label:
            "Extra buses would cost the district $$2.4$$ million dollars a year.",
        },
      ],
    },
  },
};

export default item;
