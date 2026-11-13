import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "longitude-clock",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "The Board's request for copies by other craftsmen was tied to the number of timekeepers that a navy would need.",
        },
        {
          column: 2,
          label: "Pendulum clocks failed at sea mainly because changes in temperature altered their metal parts.",
        },
        {
          column: 1,
          label: "A method based on the moon could have won the prize under the 1714 Act if it had reached the required accuracy.",
        },
        {
          column: 2,
          label: "Maskelyne's seat on the Board proves that the Board's decision about H4 was biased.",
        },
        {
          column: 1,
          label: "A ship that carried a chronometer could still gain something from taking lunar sightings.",
        },
      ],
    },
  },
};

export default item;
