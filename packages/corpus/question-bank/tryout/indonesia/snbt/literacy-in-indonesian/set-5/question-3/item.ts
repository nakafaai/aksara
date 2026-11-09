import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "urban-heat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Atap-atap itu akan menyimpan lebih banyak panas untuk dilepaskan pada malam hari.",
        },
        {
          correct: false,
          label:
            "Pendingin ruangan di gedung-gedung itu akan bekerja lebih keras pada siang hari.",
        },
        {
          correct: false,
          label:
            "Peta satelit kota itu tidak akan lagi menunjukkan perbedaan suhu permukaan.",
        },
        {
          correct: false,
          label:
            "Penguapan dari atap akan meningkat seperti penguapan dari daun.",
        },
        {
          correct: true,
          label:
            "Atap-atap itu akan memantulkan lebih banyak sinar sehingga menyerap lebih sedikit panas.",
        },
      ],
    },
  },
};

export default item;
