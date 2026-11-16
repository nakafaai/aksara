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
        { correct: false, label: "4 isomers, and hexane has the lowest boiling point" },
        { correct: false, label: "5 isomers, and hexane has the lowest boiling point" },
        { correct: true, label: "5 isomers, and 2,2-dimethylbutane has the lowest boiling point" },
        { correct: false, label: "6 isomers, and 3-methylpentane has the lowest boiling point" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "4 isomer, dan heksana mempunyai takat didih paling rendah" },
        { correct: false, label: "5 isomer, dan heksana mempunyai takat didih paling rendah" },
        { correct: true, label: "5 isomer, dan 2,2-dimetilbutana mempunyai takat didih paling rendah" },
        { correct: false, label: "6 isomer, dan 3-metilpentana mempunyai takat didih paling rendah" },
      ],
    },
  },
};

export default item;
