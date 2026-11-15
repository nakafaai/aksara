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
        { correct: false, label: "memperlihatkan bahwa buku catatan jaga sudah usang, sekaligus menjadi titik ketika Pak Darsa menyerah pada mesin" },
        { correct: false, label: "menjelaskan mengapa banyak nelayan celaka di tanjung, sekaligus menjadi alasan kantor di kota memasang lampu baru" },
        { correct: false, label: "memperlihatkan kekurangan Wulan sebagai teknisi, sekaligus menjadi titik ketika Pak Darsa mulai meragukannya" },
        { correct: false, label: "memperlihatkan bahwa Pak Darsa ingin tetap tinggal di pulau, sekaligus menjadi titik ketika ia mulai berbagi" },
        { correct: true, label: "memperlihatkan pengetahuan yang tidak dibawa lampu baru, sekaligus menjadi titik ketika Pak Darsa mulai membagikannya" },
      ],
    },
  },
};

export default item;
