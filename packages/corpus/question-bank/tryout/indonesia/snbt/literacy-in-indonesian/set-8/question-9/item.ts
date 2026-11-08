import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "school-distance",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian besar orang tua di kota besar lebih suka sekolah yang dekat rumah.",
        },
        {
          correct: false,
          label:
            "Les tambahan di kota besar semakin mahal dalam beberapa tahun terakhir.",
        },
        {
          correct: false,
          label:
            "Sekolah unggulan di kota memiliki fasilitas yang lebih lengkap daripada sekolah lain.",
        },
        {
          correct: false,
          label:
            "Pemeriksaan alamat mungkin memerlukan waktu yang lebih lama daripada biasanya.",
        },
        {
          correct: true,
          label:
            "Anak dari kecamatan tanpa SMA negeri hampir tidak pernah diterima di SMA negeri.",
        },
      ],
    },
  },
};

export default item;
