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
            "Slogan pada lima poster membuktikan bahwa pameran dapat diakses setiap keluarga di seluruh kota yang disinggahi.",
        },
        {
          correct: false,
          label:
            "Sebanyak $$64$$ komentar positif dari $$240$$ catatan membuktikan bahwa sebagian besar seluruh pengunjung mudah mengikuti demonstrasi.",
        },
        {
          correct: false,
          label:
            "Adanya $$31$$ komentar tentang bahasa teknis membuktikan bahwa pesan inklusif pada poster sengaja dibuat tidak jujur.",
        },
        {
          correct: false,
          label:
            "Delapan belas catatan tentang akses kursi roda mewakili pengalaman semua pengguna kursi roda di lima kota.",
        },
        {
          correct: true,
          label:
            "Penyelenggara menampilkan pameran sebagai kegiatan untuk setiap keluarga, tetapi catatan sukarela dari dua kota menunjukkan bahwa sebagian catatan melaporkan hambatan bahasa teknis dan akses.",
        },
      ],
    },
  },
};

export default item;
