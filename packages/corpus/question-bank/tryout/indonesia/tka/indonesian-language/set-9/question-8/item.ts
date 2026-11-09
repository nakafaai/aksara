import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "old-uniform",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Damar mulai mempelajari catatan fisika kakaknya dengan sungguh-sungguh",
        },
        {
          correct: false,
          label: "Damar membuang seragam bekas itu ke tempat sampah",
        },
        {
          correct: false,
          label: "Damar pindah sekolah agar tidak dikenali sebagai adik Galih",
        },
        {
          correct: false,
          label: "Pak Sunu meminta Damar mengganti seragamnya dengan yang baru",
        },
        {
          correct: false,
          label: "Damar menghapus bordiran nama Galih dari kerah seragam",
        },
      ],
    },
  },
};

export default item;
