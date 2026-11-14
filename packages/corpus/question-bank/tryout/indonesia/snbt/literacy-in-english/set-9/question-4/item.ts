import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "evidence-status",
  },
  stimulus: "hawthorne-effect",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "When Landsberger popularized the label, nobody had yet analysed the lighting records formally.",
        },
        {
          column: 2,
          label:
            "The 2014 review found that taking part in research rarely changes what participants do.",
        },
        {
          column: 2,
          label:
            "The 2014 review shows that research participation effects arise mainly in health research.",
        },
        {
          column: 1,
          label:
            "Had each lighting change been judged against an ordinary Monday, the rises reported after the changes would probably have looked smaller.",
        },
      ],
    },
  },
};

export default item;
