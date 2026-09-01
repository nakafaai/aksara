import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Menetapkan bahwa iradiansi tinggi selalu membuat sudut 45 derajat menjadi sudut terbaik.",
        },
        {
          isCorrect: false,
          label:
            "Mengubah suhu akhir menjadi ukuran energi agar hasil dari semua putaran dapat langsung dijumlahkan.",
        },
        {
          isCorrect: true,
          label:
            "Menjelaskan mengapa suhu antarputaran tidak boleh dibandingkan tanpa konteks energi matahari, sedangkan sudut reflektor dapat dibandingkan di dalam putaran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Membuktikan bahwa pemutaran posisi oven tidak diperlukan selama daya matahari telah dicatat.",
        },
        {
          isCorrect: false,
          label:
            "Menunjukkan bahwa iradiansi merupakan hasil yang disebabkan oleh perubahan sudut reflektor.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
