import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "pollinators",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mendatangkan lebah madu ke setiap kebun agar semua bunga terserbuki.",
        },
        {
          correct: false,
          label:
            "Membakar seluruh daun gugur agar kebun tampak bersih dan tertata.",
        },
        {
          correct: true,
          label:
            "Mencari tahu penyerbuk tanaman sebelum menentukan cara membersihkan kebun.",
        },
        {
          correct: false,
          label:
            "Menyerbuki semua bunga dengan tangan agar tidak bergantung pada hewan.",
        },
        {
          correct: false,
          label:
            "Menjauhkan kebun dari gua karena kelelawar merusak bunga durian.",
        },
      ],
    },
  },
};

export default item;
