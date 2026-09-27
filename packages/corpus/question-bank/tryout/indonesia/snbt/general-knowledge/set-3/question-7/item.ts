import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Museum meningkatkan keandalan keterangan dengan membedakan dokumen, ingatan, dan ketidakpastian, bukan dengan memaksa satu versi menang.",
        },
        {
          isCorrect: true,
          label:
            "Buku inventaris menyebut pasar sore, sedangkan empat mantan pedagang mengingat kegiatan utama sejak pagi.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan keterangan mungkin muncul karena istilah pasar sore dipakai untuk kawasan, bukan jam transaksi.",
        },
        {
          isCorrect: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
