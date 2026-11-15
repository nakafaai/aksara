import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "market-scale",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            '"Wages go up when they remember" means that employers often forget to pay wages on time.',
        },
        {
          column: 2,
          label:
            '"Watch her hands, not the needle" warns the narrator that Grandma cheats customers by sleight of hand.',
        },
        {
          column: 1,
          label:
            '"Wages go up when they remember" means that pay rises come rarely and late, so wages fall behind prices.',
        },
        {
          column: 2,
          label:
            '"Generous for others" means that Grandma gives some customers rice without taking any money.',
        },
        {
          column: 1,
          label:
            '"Honest for some, and generous for others" describes a rule under which no customer should get less rice than the needle shows.',
        },
      ],
    },
  },
};

export default item;
