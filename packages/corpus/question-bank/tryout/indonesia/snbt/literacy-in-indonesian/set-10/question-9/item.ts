import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menjadikan volume keluaran bawah sebagai ukuran tunggal bagi semua proses air di dalam kolom.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa air yang telah masuk pasti segera keluar sehingga penyimpanan tidak mungkin terjadi.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa kedua istilah dapat dipakai bergantian selama volume awalnya sama.",
        },
        {
          correct: false,
          label:
            "Menghapus kebutuhan menghitung air tersimpan karena perkolasi sudah mencakup seluruh air di dalam tanah.",
        },
        {
          correct: true,
          label:
            "Mencegah pembaca menyamakan air yang masuk dari permukaan dengan air yang telah bergerak sampai ke bawah kolom.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
