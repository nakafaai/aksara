import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "ant-foraging",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Had the scent on the long branch faded faster, colonies in the delayed test would probably have been more likely to take up the shortcut.",
        },
        {
          column: 2,
          label:
            "Studies of real species have shown that ants whose food sources move often lay trails that fade faster.",
        },
        {
          column: 1,
          label:
            "Evaporation matters less to a colony's first choice between two routes offered together than to its ability to drop a route it already uses.",
        },
        {
          column: 1,
          label:
            "By the author's reasoning, a slow-fading trail serves a colony better when its food sources stay put than when they keep moving.",
        },
      ],
    },
  },
};

export default item;
