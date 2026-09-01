import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Slogan pada lima poster membuktikan bahwa pameran dapat diakses setiap keluarga di seluruh kota yang disinggahi.",
        },
        {
          isCorrect: false,
          label:
            "Sebanyak 64 komentar positif dari 240 catatan membuktikan bahwa sebagian besar seluruh pengunjung mudah mengikuti demonstrasi.",
        },
        {
          isCorrect: false,
          label:
            "Adanya 31 komentar tentang bahasa teknis membuktikan bahwa pesan inklusif pada poster sengaja dibuat tidak jujur.",
        },
        {
          isCorrect: false,
          label:
            "Delapan belas catatan tentang akses kursi roda mewakili pengalaman semua pengguna kursi roda di lima kota.",
        },
        {
          isCorrect: true,
          label:
            "Penyelenggara menampilkan pameran sebagai kegiatan untuk setiap keluarga, tetapi catatan sukarela dari dua kota menunjukkan bahwa sebagian penulis masih mengalami hambatan bahasa dan akses.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
