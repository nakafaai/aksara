import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena poster dan buku tamu sama-sama menyebut pameran, pesan resmi pasti sama dengan pengalaman seluruh pengunjung.",
        },
        {
          isCorrect: false,
          label:
            "Buku tamu harus menggantikan poster karena tanggapan pengunjung selalu lebih netral daripada promosi penyelenggara.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan antara pesan poster dan komentar pengunjung membuktikan bahwa promosi pameran tidak jujur.",
        },
        {
          isCorrect: false,
          label:
            "Asal kota dan tujuan pembuatan sumber tidak perlu diperiksa setelah lima poster dan satu buku tamu dikumpulkan.",
        },
        {
          isCorrect: true,
          label:
            "Poster menunjukkan pesan resmi pameran, sedangkan buku tamu merekam sebagian tanggapan pengunjung; keduanya dapat dibandingkan untuk menilai hubungan pameran dengan masyarakat tanpa menganggap komentar itu mewakili semua pengunjung.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
