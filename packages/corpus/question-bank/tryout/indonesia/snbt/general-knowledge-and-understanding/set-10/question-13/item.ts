import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Bagian awal mengajukan klaim "Koreksi pengguna lebih sering diberikan pada koleksi populer", lalu bagian kedua memakai "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan" sebagai dukungan utama.',
        },
        {
          correct: false,
          label:
            'Bagian pertama menetapkan "Dokumen yang tidak muncul dalam pencarian otomatis pasti tidak tersimpan di arsip" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode".',
        },
        {
          correct: false,
          label:
            'Kedua bagian mempertahankan klaim "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          correct: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Dokumen yang tidak muncul dalam pencarian otomatis pasti tidak tersimpan di arsip" dari bukti "Koreksi pengguna lebih sering diberikan pada koleksi populer".',
        },
        {
          correct: true,
          label:
            "Perbedaan hasil pencarian mengungkap rantai kesalahan, lalu antarmuka dan audit dirancang untuk membuat batas itu dapat diperiksa.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
