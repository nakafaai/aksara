import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menetapkan bahwa iradiansi tinggi selalu membuat sudut $$45$$ derajat menjadi sudut terbaik.",
        },
        {
          correct: false,
          label:
            "Mengubah suhu akhir menjadi ukuran energi agar hasil dari semua putaran dapat langsung dijumlahkan.",
        },
        {
          correct: true,
          label:
            "Menjelaskan mengapa suhu antarputaran tidak boleh dibandingkan tanpa konteks energi matahari, sedangkan sudut reflektor dapat dibandingkan di dalam putaran yang sama.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa pemutaran posisi oven tidak diperlukan selama daya matahari telah dicatat.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa iradiansi merupakan hasil yang disebabkan oleh perubahan sudut reflektor.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
