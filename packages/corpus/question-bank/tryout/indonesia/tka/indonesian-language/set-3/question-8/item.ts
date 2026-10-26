import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Laras mengganti catatan lapangan dengan salinan peta yang sudah diperbarui",
        },
        {
          correct: false,
          label: "peta lama dipasang tanpa perubahan",
        },
        {
          correct: true,
          label:
            "warga memeriksa kembali jalur secara berkala dengan melibatkan pengguna yang beragam",
        },
        {
          correct: false,
          label: "jembatan rusak dinyatakan aman tanpa pemeriksaan",
        },
        {
          correct: false,
          label:
            "warga menunda perubahan jalur sampai peta baru selesai dicetak",
        },
      ],
    },
  },
  stimulus: "mapmakers-ink",
};

export default item;
