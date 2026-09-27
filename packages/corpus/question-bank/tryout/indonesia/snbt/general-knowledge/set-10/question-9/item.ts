import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Singkong diiris di Desa Rawa dan digoreng di kota", lalu bagian kedua memakai "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap".',
        },
        {
          isCorrect: true,
          label:
            "Ambiguitas label asal memunculkan kebutuhan pemisahan tahap, lalu simulasi penarikan menguji kegunaan rancangan baru.",
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui" dari bukti "Singkong diiris di Desa Rawa dan digoreng di kota".',
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
