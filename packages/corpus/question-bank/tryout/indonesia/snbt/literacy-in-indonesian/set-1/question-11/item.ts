import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "ferry-ticket",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Laila memberi tahu ayahnya bahwa angin bulan ini bertiup ke arah kota sehingga pelayaran aman.",
        },
        {
          correct: true,
          label:
            "Laila menegaskan bahwa arah hidupnya kini menuju kota dengan memakai ungkapan yang pernah diajarkan ayahnya.",
        },
        {
          correct: false,
          label:
            "Laila mengejek ayahnya yang terlalu percaya pada tanda-tanda alam.",
        },
        {
          correct: false,
          label:
            "Laila mengakui bahwa keputusannya belum tetap karena angin dapat berubah sewaktu-waktu.",
        },
        {
          correct: false,
          label: "Laila meminta ayahnya ikut pindah ke kota bersamanya.",
        },
      ],
    },
  },
};

export default item;
