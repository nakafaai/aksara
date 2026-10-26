import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Definisi itu mengubah selisih desibel menjadi persentase penurunan energi agar ketiga frekuensi dapat langsung dijumlahkan.",
        },
        {
          correct: false,
          label:
            "Definisi itu membuktikan bahwa panel merupakan satu-satunya penyebab perubahan karena waktu dengung diukur setelah sumber dihentikan.",
        },
        {
          correct: false,
          label:
            "Definisi itu memperluas hasil dari satu posisi mikrofon ke seluruh auditorium karena bunyi akhirnya melemah $$60\\,\\text{dB}$$.",
        },
        {
          correct: true,
          label:
            "Definisi itu membedakan ukuran lamanya bunyi bertahan dari tingkat bunyi pada tabel, sehingga pembaca memahami mengapa keduanya menjadi bukti yang saling melengkapi.",
        },
        {
          correct: false,
          label:
            "Definisi itu menunjukkan bahwa waktu dengung lebih objektif daripada desibel sehingga keterbatasan posisi mikrofon dapat diabaikan.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
