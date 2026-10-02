import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Koreksi pengguna lebih sering diberikan pada koleksi populer", lalu bagian kedua memakai "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Dokumen yang tidak muncul dalam pencarian otomatis pasti tidak tersimpan di arsip" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Dokumen yang tidak muncul dalam pencarian otomatis pasti tidak tersimpan di arsip" dari bukti "Koreksi pengguna lebih sering diberikan pada koleksi populer".',
        },
        {
          isCorrect: true,
          label:
            "Perbedaan hasil pencarian mengungkap rantai kesalahan, lalu antarmuka dan audit dirancang untuk membuat batas itu dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
