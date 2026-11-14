import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "vocabulary-in-context",
  },
  stimulus: "homeschooling",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Children who spend their days at home and are rarely seen at co-op classes, sports clubs, libraries or the other public places where children meet.",
        },
        {
          correct: false,
          label:
            "Children whose families never told anyone they teach at home, so they are missing from the national count.",
        },
        {
          correct: false,
          label:
            "Children who went back to school after the pandemic and so dropped out of the household surveys.",
        },
        {
          correct: true,
          label:
            "Homeschooled children whose progress goes unreported, above all those whose parents lack the time or training of the success stories.",
        },
        {
          correct: false,
          label:
            "Children who were bullied or whose needs a school never met, and who now flourish quietly at home.",
        },
      ],
    },
  },
};

export default item;
