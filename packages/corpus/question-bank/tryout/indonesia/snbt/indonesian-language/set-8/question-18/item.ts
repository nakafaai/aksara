import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kenaikan peminjaman membuktikan bahwa seluruh anggota menyelesaikan dan memahami lebih banyak buku setelah jadwal malam dimulai.",
        },
        {
          isCorrect: false,
          label:
            "Tiga catatan peserta baru cukup untuk mewakili pengalaman semua anggota, termasuk peserta yang memilih diam.",
        },
        {
          isCorrect: false,
          label:
            "Jadwal malam pasti menyebabkan kenaikan pilihan buku cerita pendek karena kedua perubahan terjadi pada tahun yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Sesudah jadwal berubah, pilihan cerita pendek bergambar meningkat dan beberapa peserta baru mengaitkannya dengan keberanian berdiskusi, tetapi arsip belum membuktikan penyebab atau pengalaman seluruh anggota.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan bentuk sumber membuat data peminjaman dan catatan percakapan tidak dapat dibandingkan sama sekali.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
