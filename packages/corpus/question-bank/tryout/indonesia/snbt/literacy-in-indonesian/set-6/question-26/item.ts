import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "marshmallow-test",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Uji kudapan terbukti tidak berhubungan sama sekali dengan prestasi anak di kemudian hari.",
        },
        {
          correct: false,
          label:
            "Pengendalian diri tidak berpengaruh apa pun pada sukses seseorang.",
        },
        {
          correct: false,
          label:
            "Temuan awal di Stanford keliru karena para peneliti salah mencatat lama anak menunggu.",
        },
        {
          correct: true,
          label:
            "Uji kudapan mengukur lebih dari pengendalian diri, dan hubungannya dengan prestasi sebagian besar dapat dijelaskan oleh latar keluarga dan kemampuan awal anak.",
        },
        {
          correct: false,
          label:
            "Anak dari keluarga mampu selalu sanggup menunggu lebih lama daripada anak dari keluarga kurang mampu.",
        },
      ],
    },
  },
};

export default item;
