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
        { correct: false, label: "The powder produces a larger total volume of gas" },
        { correct: true, label: "The initial rate is higher with the powder because its total surface area is larger, so effective collisions are more frequent" },
        { correct: false, label: "The powder lowers the activation energy of the reaction" },
        { correct: false, label: "The chips produce more gas because their reaction lasts longer" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Serbuk menghasilkan jumlah isi padu gas yang lebih besar" },
        { correct: true, label: "Kadar tindak balas awal lebih tinggi dengan serbuk kerana jumlah luas permukaannya lebih besar, jadi frekuensi perlanggaran berkesan lebih tinggi" },
        { correct: false, label: "Serbuk merendahkan tenaga pengaktifan tindak balas" },
        { correct: false, label: "Ketulan menghasilkan lebih banyak gas kerana tindak balasnya berlangsung lebih lama" },
      ],
    },
  },
};

export default item;
