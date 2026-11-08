import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "jamu-seller",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pekerjaan yang dianggap sederhana bisa menyimpan ilmu dan kepedulian besar.",
        },
        {
          correct: false,
          label:
            "Anak sebaiknya meneruskan pekerjaan orang tua daripada kuliah di kota.",
        },
        {
          correct: false,
          label:
            "Penjual jamu sebaiknya beristirahat jika pinggangnya mulai terasa sakit.",
        },
        {
          correct: false,
          label:
            "Ilmu dari buku kuliah selalu lebih tepat daripada pengalaman sehari-hari di pasar.",
        },
        {
          correct: false,
          label:
            "Teman sekolah tidak perlu mengetahui pekerjaan orang tua kita.",
        },
      ],
    },
  },
};

export default item;
