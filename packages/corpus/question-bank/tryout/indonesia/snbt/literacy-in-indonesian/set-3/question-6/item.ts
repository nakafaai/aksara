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
            "Ia mencari alasan untuk menunda keberangkatan, karena masih ada penumpang yang belum membeli tiket di loket terminal malam itu.",
        },
        {
          correct: false,
          label:
            "Ia benar-benar yakin jam terminal terlalu cepat, karena ia selalu berangkat tepat waktu menurut jam tangannya selama dua puluh tiga tahun.",
        },
        {
          correct: true,
          label:
            "Ia mencari alasan untuk menunda keberangkatan, karena sebagian dirinya masih menunggu penumpang kursi nomor tiga yang ia tahu tidak akan datang.",
        },
        {
          correct: false,
          label:
            "Ia ingin mempermainkan Ardi, karena kesal Ardi akan meninggalkannya untuk bekerja di kantor travel.",
        },
        {
          correct: false,
          label:
            "Ia sengaja berangkat terlambat agar bus tiba di Jakarta pada jam yang lebih sepi dan lebih aman.",
        },
      ],
    },
  },
};

export default item;
