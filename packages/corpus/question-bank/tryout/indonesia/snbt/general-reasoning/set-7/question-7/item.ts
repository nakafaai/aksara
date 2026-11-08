import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "kopi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "semua kebun kopi di atas $$1{.}000$$ meter pernah mengikuti lomba itu",
        },
        {
          correct: false,
          label:
            "lomba tahun depan akan diikuti lebih sedikit peserta daripada tahun-tahun sebelumnya",
        },
        {
          correct: false,
          label:
            "kopi dari dataran rendah tidak pernah didaftarkan dalam lomba tingkat provinsi itu",
        },
        {
          correct: true,
          label:
            "ketinggian lahan saja sudah cukup untuk menghasilkan kopi yang menjadi juara",
        },
        {
          correct: false,
          label:
            "harga lahan di ketinggian $$1{.}200$$ meter lebih mahal daripada lahan yang lebih rendah",
        },
      ],
    },
  },
};

export default item;
