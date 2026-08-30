import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Memiliki penduduk yang berpengetahuan sangat luas",
        },
        {
          isCorrect: false,
          label: "Berada di wilayah pesisir yang mudah dicapai",
        },
        {
          isCorrect: false,
          label: "Telah berkembang menjadi kota yang sepenuhnya modern",
        },
        {
          isCorrect: false,
          label: "Menutup diri dari pengaruh budaya luar",
        },
        {
          isCorrect: true,
          label:
            "Tersusun dari orang atau unsur yang berasal dari berbagai tempat",
        },
      ],
    },
  },
};

export default item;
