import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Laras mengganti catatan lapangan dengan salinan peta yang sudah diperbarui",
        },
        {
          isCorrect: false,
          label: "peta lama dipasang tanpa perubahan",
        },
        {
          isCorrect: true,
          label:
            "warga menguji jalur lain dengan melibatkan pengguna yang beragam",
        },
        {
          isCorrect: false,
          label: "jembatan rusak dinyatakan aman tanpa pemeriksaan",
        },
        {
          isCorrect: false,
          label:
            "warga menunda perubahan jalur sampai peta baru selesai dicetak",
        },
      ],
    },
  },
  stimulusKey: "mapmakers-ink",
};

export default item;
