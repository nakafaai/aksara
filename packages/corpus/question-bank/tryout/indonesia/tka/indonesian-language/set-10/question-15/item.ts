import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "mini-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menabung hanya ketika mendapat uang dalam jumlah besar",
        },
        {
          correct: false,
          label:
            "menghabiskan uang saku sebelum akhir bulan agar tidak tersisa",
        },
        { correct: false, label: "meminjam uang teman untuk ditabung" },
        {
          correct: false,
          label: "menabung hanya sampai mendapat sertifikat, lalu berhenti",
        },
        {
          correct: true,
          label:
            "menyisihkan sedikit uang secara rutin daripada menabung banyak sekaligus lalu berhenti",
        },
      ],
    },
  },
};

export default item;
