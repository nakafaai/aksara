import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kenaikan peminjaman membuktikan bahwa seluruh anggota menyelesaikan dan memahami lebih banyak buku setelah jadwal malam dimulai.",
        },
        {
          correct: false,
          label:
            "Tiga catatan peserta baru cukup untuk mewakili pengalaman semua anggota, termasuk peserta yang memilih diam.",
        },
        {
          correct: false,
          label:
            "Jadwal malam pasti menyebabkan kenaikan pilihan buku cerita pendek karena kedua perubahan terjadi pada tahun yang sama.",
        },
        {
          correct: true,
          label:
            "Sesudah jadwal berubah, pilihan cerita pendek bergambar meningkat dan beberapa peserta baru mengaitkannya dengan keberanian berdiskusi, tetapi arsip belum membuktikan penyebab atau pengalaman seluruh anggota.",
        },
        {
          correct: false,
          label:
            "Perbedaan bentuk sumber membuat data peminjaman dan catatan percakapan tidak dapat dibandingkan sama sekali.",
        },
      ],
    },
  },
};

export default item;
