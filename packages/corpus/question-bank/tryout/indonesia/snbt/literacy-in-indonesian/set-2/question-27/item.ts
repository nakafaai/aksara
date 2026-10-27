import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Memiliki penduduk yang berpengetahuan sangat luas",
        },
        {
          correct: false,
          label: "Berada di wilayah pesisir yang mudah dicapai",
        },
        {
          correct: false,
          label: "Telah berkembang menjadi kota yang sepenuhnya modern",
        },
        {
          correct: false,
          label: "Menutup diri dari pengaruh budaya luar",
        },
        {
          correct: true,
          label:
            "Tersusun dari orang atau unsur yang berasal dari berbagai tempat",
        },
      ],
    },
  },
};

export default item;
