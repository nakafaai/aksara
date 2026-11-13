import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "shorebird-flyway",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membuktikan bahwa burung pantai sanggup melewati persinggahan yang hilang, sehingga hilangnya dataran lumpur tidak terlalu mengancam",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa Jalur Terbang Asia Timur-Australasia lebih panjang daripada jalur migrasi burung lain di dunia",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa burung yang singgah di Indonesia memerlukan tempat bertengger yang dekat dengan hamparan lumpur",
        },
        {
          correct: true,
          label:
            "menegaskan bahwa kemampuan luar biasa satu jenis tidak dapat dijadikan dasar untuk mengandaikan burung lain sanggup melompati persinggahan yang hilang",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa burung muda lebih tahan menempuh perjalanan panjang daripada burung dewasa dari jenis yang sama",
        },
      ],
    },
  },
};

export default item;
