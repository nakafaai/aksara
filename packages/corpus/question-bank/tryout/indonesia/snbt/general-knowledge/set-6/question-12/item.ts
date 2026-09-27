import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan.",
        },
        {
          isCorrect: false,
          label:
            "Karena ada keluhan, uang jaminan tidak mungkin memengaruhi perilaku pengunjung.",
        },
        {
          isCorrect: false,
          label: "Satu loket dipindahkan dan jam layanannya diperpanjang.",
        },
        {
          isCorrect: true,
          label:
            "Insentif bekerja melalui layanan yang konkret, sehingga kemudahan memperoleh pengembalian dana ikut menentukan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Besarnya uang jaminan saja menentukan hasil, terlepas dari lokasi dan jam layanan loket.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
