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
        {
          correct: false,
          label:
            "2.16 g of copper, because the same current flows through both cells",
        },
        {
          correct: false,
          label:
            "1.28 g of copper, because the same number of moles is deposited in both cells",
        },
        {
          correct: true,
          label:
            "0.64 g of copper, because each copper(II) ion needs two electrons while each silver ion needs one",
        },
        {
          correct: false,
          label:
            "0.32 g of copper, because copper is less electropositive than silver",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "2.16 g kuprum, kerana arus yang sama mengalir melalui kedua-dua sel",
        },
        {
          correct: false,
          label:
            "1.28 g kuprum, kerana bilangan mol yang sama terenap dalam kedua-dua sel",
        },
        {
          correct: true,
          label:
            "0.64 g kuprum, kerana setiap ion kuprum(II) memerlukan dua elektron manakala setiap ion argentum memerlukan satu",
        },
        {
          correct: false,
          label:
            "0.32 g kuprum, kerana kuprum kurang elektropositif daripada argentum",
        },
      ],
    },
  },
};

export default item;
