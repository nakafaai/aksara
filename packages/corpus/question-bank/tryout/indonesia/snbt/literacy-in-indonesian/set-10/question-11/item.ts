import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "village-postman",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kabar bahwa Mbah Karsih sedang sakit keras dan perlu segera dijenguk.",
        },
        {
          correct: false,
          label:
            "Permintaan agar Warno lebih sering menelepon ibunya lewat video.",
        },
        {
          correct: true,
          label: "Permintaan agar Warno sesekali mengirim surat untuk ibunya.",
        },
        {
          correct: false,
          label:
            "Pemberitahuan bahwa kantor pos di kecamatan akan segera ditutup.",
        },
        {
          correct: false,
          label: "Tagihan biaya kiriman paket yang belum dibayar oleh Warno.",
        },
      ],
    },
  },
};

export default item;
