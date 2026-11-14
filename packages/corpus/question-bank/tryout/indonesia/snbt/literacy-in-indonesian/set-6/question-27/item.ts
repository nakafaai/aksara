import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "marshmallow-test",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Anak yang pernah dikecewakan kehilangan kemampuan pengendalian dirinya untuk seterusnya.",
        },
        {
          correct: false,
          label:
            "Eksperimen 2013 membantah bahwa anak dapat menunggu sama sekali.",
        },
        {
          correct: true,
          label:
            "Lama anak menunggu dapat bergantung pada pengalamannya tentang dapat tidaknya janji orang dewasa dipercaya, bukan hanya pada kemampuannya menahan diri.",
        },
        {
          correct: false,
          label:
            "Anak yang dijanjikan alat gambar lebih menyukai alat gambar daripada kudapan.",
        },
        {
          correct: false,
          label:
            "Peneliti yang menepati janji membuat anak menjadi lebih cerdas.",
        },
      ],
    },
  },
};

export default item;
