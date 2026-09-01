import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Menjadikan volume keluaran bawah sebagai ukuran tunggal bagi semua proses air di dalam kolom.",
        },
        {
          isCorrect: false,
          label:
            "Membuktikan bahwa air yang telah masuk pasti segera keluar sehingga penyimpanan tidak mungkin terjadi.",
        },
        {
          isCorrect: false,
          label:
            "Menunjukkan bahwa kedua istilah dapat dipakai bergantian selama volume awalnya sama.",
        },
        {
          isCorrect: false,
          label:
            "Menghapus kebutuhan menghitung air tersimpan karena perkolasi sudah mencakup seluruh air di dalam tanah.",
        },
        {
          isCorrect: true,
          label:
            "Mencegah pembaca menyamakan air yang masuk dari permukaan dengan air yang telah bergerak sampai ke bawah kolom.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
