import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Label foto dipilih agar keberhasilan pengembalian tidak perlu diukur lagi.",
        },
        {
          correct: false,
          label:
            "Label foto dipilih agar tim dapat mengubah banyak kondisi sekaligus.",
        },
        {
          correct: false,
          label:
            "Label foto dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          correct: false,
          label:
            "Label foto dipilih hanya karena hasil akhir uji sudah dipastikan.",
        },
        {
          correct: true,
          label:
            "Label foto dipilih untuk membantu peminjam mengenali rak pengembalian yang tepat.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
