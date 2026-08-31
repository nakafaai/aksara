import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena kondisi perubahan menghasilkan 25, sedangkan nilai awal 29 dan pembanding 28, panel peneduh yang dipasang selama empat jam siang telah terisolasi sebagai satu-satunya penyebab selama volume air, letak termometer, dan waktu pencatatan dibuat sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah volume air, letak termometer, dan waktu pencatatan bersamaan dengan panel peneduh yang dipasang selama empat jam siang agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa simulasi belum menguji hari berawan atau perubahan kecepatan angin memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang suhu air pada kolam mini.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang suhu air pada kolam mini.",
        },
        {
          isCorrect: true,
          label:
            "Pada kondisi yang diuji, panel peneduh yang dipasang selama empat jam siang berkaitan dengan perubahan dari 29 dan 28 menjadi 25; karena simulasi belum menguji hari berawan atau perubahan kecepatan angin, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
