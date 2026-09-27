import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Pengamat anonim memakai kriteria volume yang telah ditetapkan", lalu bagian kedua memakai "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama" dari bukti "Pengamat anonim memakai kriteria volume yang telah ditetapkan".',
        },
        {
          isCorrect: true,
          label:
            "Hasil awal memunculkan hipotesis, pengendalian faktor pengganggu mengujinya, dan temuan lanjutan membatasi penerapannya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
