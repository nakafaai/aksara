import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "0.42%, from the burette alone, because a pipette has no uncertainty",
        },
        {
          correct: true,
          label:
            "0.66%, adding the 0.24% of the pipette to the 0.42% of the titre",
        },
        {
          correct: false,
          label: "0.18%, the difference between the two uncertainties",
        },
        { correct: false, label: "0.21%, from one burette reading" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "0.42%, daripada buret sahaja, kerana pipet tiada ketakpastian",
        },
        {
          correct: true,
          label: "0.66%, menjumlahkan 0.24% pipet dengan 0.42% titer",
        },
        { correct: false, label: "0.18%, iaitu beza antara dua ketakpastian" },
        { correct: false, label: "0.21%, daripada satu bacaan buret" },
      ],
    },
  },
};

export default item;
