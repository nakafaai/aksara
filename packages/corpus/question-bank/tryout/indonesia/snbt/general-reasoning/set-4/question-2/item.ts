import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "lampu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lampu natrium lebih murah dipasang daripada lampu LED.",
        },
        {
          correct: true,
          label:
            "Penutup penyaring cahaya biru juga mengurangi kecerahan lampu hingga kira-kira separuhnya.",
        },
        {
          correct: false,
          label:
            "Perangkap di bawah kedua jenis lampu diganti dan dihitung isinya dengan jadwal yang sama setiap minggu.",
        },
        {
          correct: false,
          label: "Sebagian besar serangga yang tertangkap adalah ngengat.",
        },
        {
          correct: false,
          label:
            "Penggantian lampu menghemat pemakaian listrik sekitar $$50\\%$$.",
        },
      ],
    },
  },
};

export default item;
