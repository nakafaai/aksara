import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Museum meningkatkan keandalan keterangan dengan membedakan dokumen, ingatan, dan ketidakpastian, bukan dengan memaksa satu versi menang.",
        },
        {
          correct: true,
          label:
            "Buku inventaris menyebut pasar sore, sedangkan empat mantan pedagang mengingat kegiatan utama sejak pagi.",
        },
        {
          correct: false,
          label:
            "Perbedaan keterangan mungkin muncul karena istilah pasar sore dipakai untuk kawasan, bukan jam transaksi.",
        },
        {
          correct: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
        {
          correct: false,
          label:
            "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
