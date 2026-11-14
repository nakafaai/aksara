import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "marshmallow-test",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "tanda bahwa anak itu kelak akan gagal di sekolah",
        },
        {
          correct: true,
          label:
            "pilihan yang masuk akal berdasarkan pengalamannya bahwa sesuatu yang ditunda bisa saja tidak pernah didapat",
        },
        {
          correct: false,
          label:
            "bukti bahwa anak itu tidak memiliki pengendalian diri sejak lahir",
        },
        {
          correct: false,
          label: "akibat ketidaksukaan anak itu kepada peneliti",
        },
        {
          correct: false,
          label: "tanda bahwa anak itu belum memahami tawaran peneliti",
        },
      ],
    },
  },
};

export default item;
