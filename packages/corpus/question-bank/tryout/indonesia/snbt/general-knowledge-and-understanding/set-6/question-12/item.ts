import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan.",
        },
        {
          correct: false,
          label:
            "Karena ada keluhan, uang jaminan tidak mungkin memengaruhi perilaku pengunjung.",
        },
        {
          correct: false,
          label: "Satu loket dipindahkan dan jam layanannya diperpanjang.",
        },
        {
          correct: true,
          label:
            "Insentif bekerja melalui layanan yang konkret, sehingga kemudahan memperoleh pengembalian dana ikut menentukan hasil.",
        },
        {
          correct: false,
          label:
            "Besarnya uang jaminan saja menentukan hasil, terlepas dari lokasi dan jam layanan loket.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
