import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "phone-ban",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A nearby school that changed to the same textbook and hired new maths teachers that year, but did not ban phones, saw no change in its pass rate.",
        },
        {
          correct: false,
          label:
            "Teachers reported that pupils spent more time on maths homework after the ban.",
        },
        {
          correct: false,
          label:
            "Pass rates also rose that year at three other schools that banned phones.",
        },
        {
          correct: false,
          label:
            "The school's maths pass rate had been rising steadily for five years before the ban.",
        },
        {
          correct: false,
          label:
            "The two new maths teachers had both won teaching awards at their previous schools.",
        },
      ],
    },
  },
};

export default item;
