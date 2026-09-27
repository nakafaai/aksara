import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Kesepakatan pada foto saat air pasang tetap lebih rendah", lalu bagian kedua memakai "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah" sebagai dukungan utama.',
        },
        {
          isCorrect: true,
          label:
            "Lonjakan laporan memunculkan dugaan pemulihan, lalu audit akses dan klasifikasi membatasi cara dugaan itu ditafsirkan.",
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Daerah tanpa laporan pasti tidak memiliki bibit mangrove" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Daerah tanpa laporan pasti tidak memiliki bibit mangrove" dari bukti "Kesepakatan pada foto saat air pasang tetap lebih rendah".',
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
