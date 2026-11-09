import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "urban-heat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pendingin ruangan rusak lebih cepat jika dipakai terus-menerus.",
        },
        {
          correct: false,
          label: "Pendingin ruangan membuat udara di dalam gedung makin panas.",
        },
        {
          correct: false,
          label:
            "Pemakaian pendingin ruangan memaksa kota membangun lebih banyak jalan.",
        },
        {
          correct: true,
          label:
            "Kota yang makin panas mendorong pemakaian alat yang membuang panas ke luar.",
        },
        {
          correct: false,
          label:
            "Warga cenderung berhenti memakai pendingin ruangan ketika listrik mahal.",
        },
      ],
    },
  },
};

export default item;
