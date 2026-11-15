import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "night-bus-driver",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Warsito mencari dalih untuk menunda keberangkatan, karena masih ada penumpang yang belum membeli tiket sehingga kursi belum terjual semua.",
        },
        {
          correct: false,
          label:
            "Warsito benar-benar yakin jam terminal terlalu cepat, karena ia selalu berangkat tepat waktu menurut jam tangannya.",
        },
        {
          correct: true,
          label:
            "Warsito mencari dalih untuk menunda keberangkatan, karena sebagian dirinya masih menunggu nenek berkerudung biru yang biasa naik pada menit terakhir.",
        },
        {
          correct: false,
          label:
            "Warsito mencari dalih untuk menunda keberangkatan, karena ia kesal Ardi memintanya tidak mampir di Pemalang.",
        },
        {
          correct: false,
          label:
            "Warsito mencari dalih untuk menunda keberangkatan, karena ia ingin tiba di Jakarta ketika jalan lebih sepi.",
        },
      ],
    },
  },
};

export default item;
