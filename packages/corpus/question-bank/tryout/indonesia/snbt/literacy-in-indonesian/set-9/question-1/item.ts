import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pengujian awal menunjukkan panel gabus berkaitan dengan penurunan tingkat bunyi dan waktu dengung pada kondisi tertentu, tetapi bukti itu belum mewakili seluruh ruang atau frekuensi.",
        },
        {
          isCorrect: false,
          label:
            "Pengujian membuktikan bahwa panel gabus selalu menurunkan energi bunyi sebesar persentase yang sama dengan selisih angka desibel pada setiap frekuensi.",
        },
        {
          isCorrect: false,
          label:
            "Kembalinya angka setelah panel dilepas menunjukkan bahwa posisi mikrofon tidak lagi perlu dikendalikan pada pengujian berikutnya.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan waktu dengung pada satu posisi menjadi bukti yang lebih kuat daripada seluruh data tingkat bunyi karena langsung mengukur mutu auditorium.",
        },
        {
          isCorrect: false,
          label:
            "Tujuan utama laporan adalah memilih satu frekuensi terbaik agar pengukuran pada frekuensi dan ruang lain tidak perlu dilakukan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
