import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "text-structure",
  },
  stimulus: "lighthouse-keeper",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa buku catatan jaga sudah usang dan tidak lagi dibaca siapa pun, termasuk kantor di kota",
        },
        {
          correct: true,
          label:
            "memperlihatkan pengetahuan tentang laut yang tidak dapat dibaca oleh sensor lampu baru",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa tanda langit Pak Darsa lebih tepat daripada sensor lampu baru",
        },
        {
          correct: true,
          label:
            "menandai saat sikap Pak Darsa terhadap Wulan berubah dari menjaga jarak menjadi berbagi",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa kantor di kota memutuskan mengganti penjaga dengan lampu otomatis",
        },
      ],
    },
  },
};

export default item;
