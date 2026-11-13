import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "homeschooling",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It rejects the parent's survey figures and argues that most families who began homeschooling in 2020 have already gone back to school.",
        },
        {
          correct: false,
          label:
            "It accepts the parent's conclusion about results but faults her for relying on her own family rather than on national test data.",
        },
        {
          correct: false,
          label:
            "It questions only how homeschooling is counted, since state rules make national figures unreliable, and leaves her claims about results alone.",
        },
        {
          correct: false,
          label:
            "It shares her view that the burden of proof belongs to those who want tighter rules, although it would like better data first.",
        },
        {
          correct: true,
          label:
            "It grants that the rise is real and that many homeschooled children do well, but holds that neither her studies nor her story shows what homeschooling causes.",
        },
      ],
    },
  },
};

export default item;
