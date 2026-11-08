import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "school-distance",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "aturan jarak dapat menutup peluang anak berprestasi yang jauh dari sekolah",
        },
        {
          correct: false,
          label:
            "anak-anak di kecamatan itu umumnya memiliki nilai yang kurang baik",
        },
        {
          correct: false,
          label:
            "sekolah di kecamatan itu menolak semua pendaftar yang bernilai tinggi",
        },
        {
          correct: false,
          label:
            "jarak rumah lebih penting daripada nilai rapor bagi para orang tua di kecamatan itu",
        },
        {
          correct: false,
          label:
            "anak-anak di kecamatan itu mungkin lebih suka bersekolah di luar kota",
        },
      ],
    },
  },
};

export default item;
