import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "point-of-view",
  },
  stimulus: "wallace-line",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penulis menolaknya, karena pergantian burung yang dicatat Wallace di antara Bali dan Lombok sudah cukup tajam untuk ditandai dengan satu garis.",
        },
        {
          correct: false,
          label:
            "Penulis menerimanya sepenuhnya, karena adanya garis Weber menunjukkan bahwa tidak ada satu batas pun yang tepat di kawasan itu.",
        },
        {
          correct: false,
          label:
            "Penulis menerimanya hanya untuk mamalia darat, karena kelompok inilah yang paling sulit menyeberangi laut dalam.",
        },
        {
          correct: true,
          label:
            "Penulis menerimanya untuk makhluk yang mudah menyeberangi laut, tetapi tetap memandang Selat Lombok sebagai batas yang tajam bagi mamalia darat.",
        },
        {
          correct: false,
          label:
            "Penulis menganggapnya belum dapat dinilai, karena sebagian hewan di timur garis kemungkinan dibawa oleh manusia.",
        },
      ],
    },
  },
};

export default item;
