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
        { correct: true, label: "3 esters: methyl propanoate, ethyl ethanoate and propyl methanoate" },
        { correct: false, label: "2 esters: methyl propanoate and ethyl ethanoate" },
        { correct: false, label: "4 esters, including butyl methanoate" },
        { correct: false, label: "3 esters, including ethyl propanoate" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "3 ester: metil propanoat, etil etanoat dan propil metanoat" },
        { correct: false, label: "2 ester: metil propanoat dan etil etanoat" },
        { correct: false, label: "4 ester, termasuk butil metanoat" },
        { correct: false, label: "3 ester, termasuk etil propanoat" },
      ],
    },
  },
};

export default item;
