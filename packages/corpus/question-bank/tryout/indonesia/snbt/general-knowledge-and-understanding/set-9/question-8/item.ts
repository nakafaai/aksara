import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Bagian awal mengajukan klaim "Pengamat anonim memakai kriteria volume yang telah ditetapkan", lalu bagian kedua memakai "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang" sebagai dukungan utama.',
        },
        {
          correct: false,
          label:
            'Bagian pertama menetapkan "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru".',
        },
        {
          correct: false,
          label:
            'Kedua bagian mempertahankan klaim "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          correct: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama" dari bukti "Pengamat anonim memakai kriteria volume yang telah ditetapkan".',
        },
        {
          correct: true,
          label:
            "Hasil awal memunculkan hipotesis, pengendalian faktor pengganggu mengujinya, dan temuan lanjutan membatasi penerapannya.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
