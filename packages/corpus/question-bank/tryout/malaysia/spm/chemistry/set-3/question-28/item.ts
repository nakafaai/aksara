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
        { correct: false, label: "2 isomers, and pentane has the lowest boiling point" },
        { correct: false, label: "3 isomers, and pentane has the lowest boiling point" },
        { correct: true, label: "3 isomers, and 2,2-dimethylpropane has the lowest boiling point" },
        { correct: false, label: "4 isomers, and 2-methylbutane has the lowest boiling point" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "2 isomer, dan pentana mempunyai takat didih paling rendah" },
        { correct: false, label: "3 isomer, dan pentana mempunyai takat didih paling rendah" },
        { correct: true, label: "3 isomer, dan 2,2-dimetilpropana mempunyai takat didih paling rendah" },
        { correct: false, label: "4 isomer, dan 2-metilbutana mempunyai takat didih paling rendah" },
      ],
    },
  },
};

export default item;
