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
          correct: false,
          label:
            "Propene gives more carbon dioxide, because each molecule has more carbon atoms",
        },
        {
          correct: false,
          label:
            "Ethene gives more carbon dioxide, because the same mass holds more molecules",
        },
        {
          correct: true,
          label:
            "Both give 17.6 g of carbon dioxide, because every alkene has the same 85.7% of carbon by mass",
        },
        {
          correct: false,
          label:
            "Both give 8.8 g of carbon dioxide, because each sample holds 0.20 mol of carbon atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Propena menghasilkan lebih banyak karbon dioksida, kerana setiap molekulnya mempunyai lebih banyak atom karbon",
        },
        {
          correct: false,
          label:
            "Etena menghasilkan lebih banyak karbon dioksida, kerana jisim yang sama mengandungi lebih banyak molekul",
        },
        {
          correct: true,
          label:
            "Kedua-duanya menghasilkan 17.6 g karbon dioksida, kerana setiap alkena mempunyai 85.7% karbon mengikut jisim yang sama",
        },
        {
          correct: false,
          label:
            "Kedua-duanya menghasilkan 8.8 g karbon dioksida, kerana setiap sampel mengandungi 0.20 mol atom karbon",
        },
      ],
    },
  },
};

export default item;
