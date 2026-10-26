import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Before the first rehearsal, the writer practiced every evening on a saron at home.",
        },
        {
          column: 1,
          label:
            "The group had to stop twice because the writer's speed did not match theirs.",
        },
        {
          column: 2,
          label:
            "Bu Ratna told the writer to count the beats more carefully in the next piece.",
        },
      ],
    },
  },
  stimulus: "gamelan-rehearsal",
};

export default item;
