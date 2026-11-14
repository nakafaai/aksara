import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "keroncong-origin",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sebutan itu benar untuk asal alat petiknya, tetapi keliru jika diartikan bahwa jenis musiknya sendiri didatangkan dari Portugal.",
        },
        {
          correct: false,
          label:
            "Sebutan itu keliru, sebab keroncong sepenuhnya berasal dari Jawa dan baru kemudian memakai alat musik Eropa.",
        },
        {
          correct: false,
          label:
            "Sebutan itu benar, sebab orang Tugu memelihara musik leluhurnya tanpa perubahan selama beberapa generasi.",
        },
        {
          correct: false,
          label:
            "Sebutan itu tidak dapat dinilai, sebab asal-usul sebuah jenis musik tidak mungkin ditelusuri.",
        },
        {
          correct: false,
          label:
            "Sebutan itu benar sampai akhir abad ke-19, tetapi tidak berlaku lagi setelah biola dan selo masuk.",
        },
      ],
    },
  },
};

export default item;
