import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Permainan menjadi adil karena semua peserta akhirnya melakukan peran yang sama melalui jalur berbeda.",
        },
        {
          isCorrect: true,
          label:
            "Perbaikan muncul melalui siklus mendengar, mengubah, mencoba, dan mencatat lagi, sehingga satu keberhasilan tidak menutup evaluasi.",
        },
        {
          isCorrect: false,
          label:
            "Catatan meja akhir menunjukkan perubahan pertama gagal dan permainan seharusnya dikembalikan ke rancangan awal.",
        },
        {
          isCorrect: false,
          label:
            "Pilihan tiga anak cukup untuk mewakili kebutuhan semua calon peserta taman bermain.",
        },
        {
          isCorrect: false,
          label:
            "Menurunkan keranjang membuktikan seluruh hambatan fisik dapat diselesaikan dengan perubahan ketinggian.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
