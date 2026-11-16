import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Ammonia makes latex coagulate, because its hydroxide ions neutralise the charge on the rubber particles" },
        { correct: false, label: "Untreated latex coagulates within an hour, because oxygen in the air oxidises the rubber" },
        { correct: true, label: "Untreated latex coagulates later than the acidified sample, because bacteria slowly produce lactic acid whose hydrogen ions neutralise the negative charge on the rubber particles" },
        { correct: false, label: "Ethanoic acid makes latex coagulate by breaking the double bonds in rubber" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Ammonia menyebabkan lateks menggumpal, kerana ion hidroksidanya meneutralkan cas pada zarah getah" },
        { correct: false, label: "Lateks tanpa rawatan menggumpal dalam masa sejam, kerana oksigen di udara mengoksidakan getah" },
        { correct: true, label: "Lateks tanpa rawatan menggumpal lebih lewat daripada sampel berasid, kerana bakteria perlahan-lahan menghasilkan asid laktik yang ion hidrogennya meneutralkan cas negatif pada zarah getah" },
        { correct: false, label: "Asid etanoik menyebabkan lateks menggumpal dengan memutuskan ikatan ganda dua dalam getah" },
      ],
    },
  },
};

export default item;
