import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "lighthouse-keeper",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lampu itu rusak pada hari pertama, dan senyum Pak Darsa menunjukkan kepuasannya karena kekhawatirannya terbukti.",
        },
        {
          correct: false,
          label:
            "Lampu yang padam menunjukkan kelalaian Wulan, dan senyum Pak Darsa menyembunyikan kekecewaannya.",
        },
        {
          correct: false,
          label:
            "Aturan bahwa mercusuar tidak boleh tidur tidak lagi mengikat, dan senyum itu menunjukkan Pak Darsa sudah memahami sepenuhnya perasaannya.",
        },
        {
          correct: false,
          label:
            "Pesan ayahnya membuat Pak Darsa terkurung di pulau, dan senyum itu menunjukkan kemarahannya akhirnya reda.",
        },
        {
          correct: true,
          label:
            "Aturan bahwa mercusuar tidak boleh tidur tidak lagi mengikat, dan senyum itu menunjukkan penerimaan yang belum sepenuhnya ia pahami.",
        },
      ],
    },
  },
};

export default item;
