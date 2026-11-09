import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "honesty-canteen",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*Koperasi* berarti ruangan tempat siswa membayar dengan kode QR.",
        },
        {
          correct: true,
          label: "*Stok* berarti persediaan barang yang dijual di kantin.",
        },
        {
          correct: false,
          label: "*Kode QR* berarti nomor urut antrean siswa di kantin.",
        },
        {
          correct: true,
          label:
            "*Kampanye* berarti kegiatan terencana untuk mengajak siswa melakukan sesuatu.",
        },
      ],
    },
  },
};

export default item;
