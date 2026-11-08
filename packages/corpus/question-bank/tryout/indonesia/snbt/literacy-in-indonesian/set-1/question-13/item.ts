import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "plot-function",
  },
  stimulus: "ferry-ticket",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menjelaskan alasan Pak Rasyid memilih bekerja sebagai petugas loket pelabuhan.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa pelayaran dari Teluk Sari ke kota selalu berbahaya.",
        },
        {
          correct: true,
          label:
            "Menunjukkan bahwa melepas Laila memaksanya menghadapi ketakutan lama akan kehilangan.",
        },
        {
          correct: false,
          label:
            "Menggambarkan ketegasan Pak Rasyid terhadap penumpang yang melanggar aturan.",
        },
        {
          correct: false,
          label:
            "Menyiratkan bahwa Laila akan mengalami nasib yang sama dengan istri Pak Rasyid.",
        },
      ],
    },
  },
};

export default item;
