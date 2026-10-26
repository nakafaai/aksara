import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Permainan menjadi adil karena semua peserta akhirnya melakukan peran yang sama melalui jalur berbeda.",
        },
        {
          correct: true,
          label:
            "Perbaikan muncul melalui siklus mendengar, mengubah, mencoba, dan mencatat lagi, sehingga satu keberhasilan tidak menutup evaluasi.",
        },
        {
          correct: false,
          label:
            "Catatan meja akhir menunjukkan perubahan pertama gagal dan permainan seharusnya dikembalikan ke rancangan awal.",
        },
        {
          correct: false,
          label:
            "Pilihan tiga anak cukup untuk mewakili kebutuhan semua calon peserta taman bermain.",
        },
        {
          correct: false,
          label:
            "Menurunkan keranjang membuktikan seluruh hambatan fisik dapat diselesaikan dengan perubahan ketinggian.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
