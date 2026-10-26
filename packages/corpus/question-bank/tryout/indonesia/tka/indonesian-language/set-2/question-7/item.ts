import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dara memilih rekaman lama sebagai pengganti siaran suara alumni",
        },
        {
          correct: false,
          label:
            "Bimo memindahkan kaset berjamur ke ruang siaran sebelum proses digitalisasi",
        },
        {
          correct: false,
          label: "kepala sekolah membatalkan laboratorium bahasa",
        },
        {
          correct: false,
          label: "penjaga sekolah menanam pohon baru saat siaran",
        },
        {
          correct: true,
          label: "Dara menyajikan rekaman lama beserta konteksnya",
        },
      ],
    },
  },
  stimulus: "last-broadcast",
};

export default item;
