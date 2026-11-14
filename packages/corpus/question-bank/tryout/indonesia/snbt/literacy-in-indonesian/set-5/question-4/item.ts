import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "wallace-line",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sejenis monyet ternyata ditemukan hidup liar, baik di Bali maupun di Lombok.",
        },
        {
          correct: false,
          label:
            "Puluhan jenis burung pemakan buah ternyata ditemukan hidup di kedua pulau.",
        },
        {
          correct: false,
          label:
            "Pengukuran baru menunjukkan Selat Lombok lebih sempit daripada perkiraan sebelumnya.",
        },
        {
          correct: true,
          label:
            "Fosil menunjukkan sebagian besar jenis mamalia darat Bali sudah hidup di Lombok jauh sebelum manusia tiba.",
        },
        {
          correct: false,
          label:
            "Beberapa jenis mamalia darat Bali baru muncul di Lombok setelah perdagangan ternak antarpulau ramai.",
        },
      ],
    },
  },
};

export default item;
