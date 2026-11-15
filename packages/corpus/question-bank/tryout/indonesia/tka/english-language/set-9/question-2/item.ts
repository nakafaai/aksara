import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "data-plan",
  versions: {
    en: {
      columns: ["Still valid", "Already ended"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "A Harian bought at 23:00 on a Monday, checked at 0:30 on Tuesday",
        },
        {
          column: 1,
          label:
            "A Mingguan bought at 8:00 on a Wednesday, checked at 22:00 on the following Tuesday",
        },
        {
          column: 2,
          label:
            "A Mingguan bought at 8:00 on a Wednesday, checked at 7:00 on the following Wednesday",
        },
        {
          column: 1,
          label:
            "A Bulanan bought at 10:00 on 1 March, checked at 23:00 on 30 March",
        },
        {
          column: 2,
          label:
            "A Bulanan bought at 10:00 on 1 March, checked at 0:10 on 31 March",
        },
      ],
    },
  },
};

export default item;
