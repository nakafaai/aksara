import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "last-angkot",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mak Inah ingin anak Pak Damar mengetahui bahwa ayahnya miskin.",
        },
        {
          correct: false,
          label:
            "Mak Inah merasa tersinggung karena tawaran gratis dari Pak Damar.",
        },
        {
          correct: false,
          label:
            "Mak Inah ingin Pak Damar menabung uang itu untuk biaya sekolah anaknya.",
        },
        {
          correct: true,
          label:
            "Mak Inah ingin menghargai kerja Pak Damar dan menjaga harga dirinya sebagai ayah.",
        },
        {
          correct: false,
          label:
            "Mak Inah menyindir Pak Damar yang meninggalkan angkot demi bus koridor.",
        },
      ],
    },
  },
};

export default item;
