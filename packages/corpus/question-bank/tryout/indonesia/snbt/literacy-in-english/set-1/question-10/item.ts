import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "paraphrase",
  },
  stimulus: "homework-limits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The pilot pupils' scores were in fact lower than last year's, but the way the tests were set up hid the difference.",
        },
        {
          correct: true,
          label:
            "Matching last year's scores proves little, because the pupils were different and the tests had no stakes, so a small decline cannot be ruled out.",
        },
        {
          correct: false,
          label:
            "The scores would have been convincing if the tests had counted towards the pupils' grades.",
        },
        {
          correct: false,
          label:
            "Test scores cannot show what homework does, so the pilot told the school nothing useful.",
        },
        {
          correct: false,
          label:
            "The pilot pupils scored lower than expected because the tests did not count and so they made less effort.",
        },
      ],
    },
  },
};

export default item;
