import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$4$$ esters, and ethyl propanoate gives ethanol on hydrolysis",
        },
        {
          correct: false,
          label:
            "$$3$$ esters, and ethyl propanoate gives ethanol on hydrolysis",
        },
        {
          correct: false,
          label:
            "$$4$$ esters, and propyl ethanoate gives ethanol on hydrolysis",
        },
        {
          correct: false,
          label:
            "$$5$$ esters, counting pentanoic acid, and ethyl propanoate gives ethanol on hydrolysis",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$4$$ ester, dan etil propanoat menghasilkan etanol apabila dihidrolisis",
        },
        {
          correct: false,
          label:
            "$$3$$ ester, dan etil propanoat menghasilkan etanol apabila dihidrolisis",
        },
        {
          correct: false,
          label:
            "$$4$$ ester, dan propil etanoat menghasilkan etanol apabila dihidrolisis",
        },
        {
          correct: false,
          label:
            "$$5$$ ester, termasuk asid pentanoik, dan etil propanoat menghasilkan etanol apabila dihidrolisis",
        },
      ],
    },
  },
};

export default item;
