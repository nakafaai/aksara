import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "panas",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Perbedaan suhu antara pusat kota dan daerah pinggiran paling terasa pada siang hari.",
        },
        {
          column: 2,
          label:
            "Pepohonan membuat udara lebih panas karena daunnya menyerap panas matahari.",
        },
        {
          column: 1,
          label: "Mesin kendaraan ikut menambah panas di kota.",
        },
        {
          column: 1,
          label:
            "Pemakaian pendingin ruangan dapat memperparah pulau panas perkotaan.",
        },
      ],
    },
  },
};

export default item;
