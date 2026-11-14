import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  stimulus: "grandma-recipe",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sinta ingin melengkapi resep untuk orang berikutnya sambil tetap menghormati tulisan Nenek",
        },
        {
          correct: false,
          label:
            "Sinta ingin mengganti resep Nenek dengan resep buatannya sendiri",
        },
        {
          correct: false,
          label: "Sinta malu karena gagal tiga kali sebelum berhasil",
        },
        {
          correct: false,
          label: "Sinta ingin menghapus takaran yang menurutnya aneh",
        },
        {
          correct: false,
          label: "Sinta menulis catatan itu agar Ibu tidak memarahinya",
        },
      ],
    },
  },
};

export default item;
