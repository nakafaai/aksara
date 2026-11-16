import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Experiment III gives the same final volume as Experiment I, but more slowly" },
        { correct: false, label: "Experiment II gives a larger final volume than Experiment I" },
        { correct: false, label: "Experiment IV gives a larger final volume than Experiment I" },
        { correct: false, label: "Experiment III gives half the final volume of Experiment I" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Eksperimen III menghasilkan isi padu akhir yang sama dengan Eksperimen I, tetapi lebih perlahan" },
        { correct: false, label: "Eksperimen II menghasilkan isi padu akhir yang lebih besar daripada Eksperimen I" },
        { correct: false, label: "Eksperimen IV menghasilkan isi padu akhir yang lebih besar daripada Eksperimen I" },
        { correct: false, label: "Eksperimen III menghasilkan separuh isi padu akhir Eksperimen I" },
      ],
    },
  },
};

export default item;
