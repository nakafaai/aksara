import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "concision",
  },
  stimulus: "bantaran",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mural yang paling sering dipotret pengunjung adalah gambar ikan yang dulu hidup di Sungai Ciwangi.",
        },
        {
          correct: false,
          label:
            "Menurut warga, mural yang sering dipotret pengunjung adalah gambar ikan yang dulu hidup di Sungai Ciwangi.",
        },
        {
          correct: false,
          label:
            "Menurut warga, mural yang paling sering dipotret pengunjung adalah gambar ikan yang hidup di Sungai Ciwangi.",
        },
        {
          correct: false,
          label:
            "Menurut keterangan para warga, mural yang paling sering dipotret oleh pengunjung adalah mural bergambar ikan-ikan sungai yang dulu pernah hidup di Sungai Ciwangi.",
        },
        {
          correct: true,
          label:
            "Menurut warga, mural yang paling sering dipotret pengunjung adalah gambar ikan yang dulu hidup di Sungai Ciwangi.",
        },
      ],
    },
  },
};

export default item;
