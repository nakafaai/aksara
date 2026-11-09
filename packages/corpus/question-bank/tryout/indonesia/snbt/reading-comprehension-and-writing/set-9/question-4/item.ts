import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "fire-volunteers",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kampung lain sudah memiliki terlalu banyak relawan.",
        },
        {
          correct: false,
          label:
            "Mobil pemadam kebakaran sudah tidak dipakai lagi di kelurahan itu.",
        },
        {
          correct: false,
          label:
            "Regu itu memadamkan api lebih lambat daripada petugas pemadam.",
        },
        {
          correct: false,
          label: "Kompor di semua rumah warga sering terbakar.",
        },
        {
          correct: true,
          label:
            "Kampung yang gangnya sempit sulit dijangkau mobil pemadam sehingga memerlukan regu pemadam di dalam kampung.",
        },
      ],
    },
  },
};

export default item;
