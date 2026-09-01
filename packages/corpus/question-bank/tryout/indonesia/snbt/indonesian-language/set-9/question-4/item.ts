import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi itu mengubah selisih desibel menjadi persentase penurunan energi agar ketiga frekuensi dapat langsung dijumlahkan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membuktikan bahwa panel merupakan satu-satunya penyebab perubahan karena waktu dengung diukur setelah sumber dihentikan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu memperluas hasil dari satu posisi mikrofon ke seluruh auditorium karena bunyi akhirnya melemah 60 dB.",
        },
        {
          isCorrect: true,
          label:
            "Definisi itu membedakan ukuran lamanya bunyi bertahan dari tingkat bunyi pada tabel, sehingga pembaca memahami mengapa keduanya menjadi bukti yang saling melengkapi.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menunjukkan bahwa waktu dengung lebih objektif daripada desibel sehingga keterbatasan posisi mikrofon dapat diabaikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
