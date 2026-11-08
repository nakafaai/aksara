import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "term-meaning",
  },
  stimulus: "bahasa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pembagian harta keluarga kepada keturunan.",
        },
        {
          correct: false,
          label: "Perpindahan penduduk dari desa ke kota.",
        },
        {
          correct: true,
          label:
            "Penurunan bahasa dari generasi tua kepada generasi muda melalui pemakaian sehari-hari.",
        },
        {
          correct: false,
          label: "Pengajaran bahasa daerah di sekolah formal.",
        },
        {
          correct: false,
          label: "Pencatatan kosakata bahasa daerah oleh peneliti.",
        },
      ],
    },
  },
};

export default item;
