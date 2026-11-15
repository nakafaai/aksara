import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "bat-echolocation",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Katak berkulit merah menyala yang beracun membuat burung yang pernah mencicipinya enggan menyerang katak sejenis.",
        },
        {
          correct: true,
          label:
            "Kapal menebar serpihan logam pemantul tepat ketika rudal berpemandu radar memasuki tahap akhir pengejarannya.",
        },
        {
          correct: false,
          label:
            "Kupu-kupu tiba-tiba membuka sayap bercorak mata besar sehingga burung yang belum pernah melihatnya mundur sejenak.",
        },
        {
          correct: false,
          label:
            "Ikan pemangsa mendekati kawanan ikan kecil dengan gerakan sangat pelan agar kehadirannya terlambat diketahui.",
        },
        {
          correct: false,
          label:
            "Stasiun radio memancarkan derau terus-menerus sepanjang hari sehingga semua siaran di sekitarnya terganggu.",
        },
      ],
    },
  },
};

export default item;
