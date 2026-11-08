import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "rooftop-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tanaman hidroponik di sekolah itu tidak memerlukan unsur hara.",
        },
        {
          correct: false,
          label: "Sabut kelapa menjadi sumber nutrisi utama bagi tanaman.",
        },
        {
          correct: false,
          label: "Larutan yang asam membuat akar tumbuh lebih cepat.",
        },
        {
          correct: false,
          label: "Hasil panen pertama dibagikan tanpa bayaran kepada orang tua siswa.",
        },
        {
          correct: true,
          label: "Jika pompa berhenti bekerja, larutan tidak lagi sampai ke ujung atas pipa.",
        },
      ],
    },
  },
};

export default item;
