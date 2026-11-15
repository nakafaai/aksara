import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "homework-cap",
  versions: {
    en: {
      columns: [
        "Stated as a fact",
        "Stated as an opinion",
        "Not stated in either text",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "More than half of the students surveyed slept less than seven hours on school nights.",
        },
        {
          column: 3,
          label: "Teachers set about $$2.1$$ hours of homework a day.",
        },
        {
          column: 2,
          label: "A firm cap is the only fair answer.",
        },
        {
          column: 1,
          label:
            "Bu Anjani's students reported spending longer on her tasks than she had planned.",
        },
        {
          column: 3,
          label: "A shared calendar would end students' tiredness.",
        },
        {
          column: 2,
          label:
            "A school that keeps students up past midnight is failing them.",
        },
      ],
    },
  },
};

export default item;
