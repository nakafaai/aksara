import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "countdown-lights",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "data itu membuat dinas segera memasang penghitung di semua persimpangan",
        },
        {
          correct: false,
          label: "keputusan dinas tidak dipengaruhi oleh data rekaman",
        },
        {
          correct: true,
          label:
            "karena data menunjukkan efek yang berlawanan, dinas memilih menguji lagi sebelum memasang alat di semua persimpangan",
        },
        {
          correct: false,
          label:
            "data menunjukkan semua jenis pelanggaran meningkat setelah penghitung dipasang",
        },
        {
          correct: false,
          label: "dinas menghentikan rekaman karena kameranya rusak",
        },
      ],
    },
  },
};

export default item;
