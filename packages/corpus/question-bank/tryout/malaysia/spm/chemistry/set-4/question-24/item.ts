import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The copper electrode loses 0.64 g, because copper atoms give up electrons" },
        { correct: false, label: "The zinc electrode gains 0.65 g, because zinc ions are discharged on it" },
        { correct: false, label: "Electrons flow through the wire from copper to zinc" },
        { correct: true, label: "The zinc electrode loses 0.65 g, the copper electrode gains 0.64 g, and the blue colour of the copper(II) sulfate solution fades" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Elektrod kuprum kehilangan 0.64 g, kerana atom kuprum melepaskan elektron" },
        { correct: false, label: "Elektrod zink bertambah 0.65 g, kerana ion zink dinyahcas padanya" },
        { correct: false, label: "Elektron mengalir melalui wayar dari kuprum ke zink" },
        { correct: true, label: "Elektrod zink kehilangan 0.65 g, elektrod kuprum bertambah 0.64 g, dan warna biru larutan kuprum(II) sulfat menjadi pudar" },
      ],
    },
  },
};

export default item;
