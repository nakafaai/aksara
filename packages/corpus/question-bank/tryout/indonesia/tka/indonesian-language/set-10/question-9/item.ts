import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "grandma-recipe",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ibu menyimpan buku resep itu agar tidak ada yang membukanya lagi",
        },
        {
          correct: false,
          label: "Sinta membeli nastar di toko karena membuatnya terlalu sulit",
        },
        { correct: false, label: "adik Ibu membuang buku resep Nenek" },
        { correct: false, label: "Sinta menghapus catatannya dari buku resep" },
        {
          correct: true,
          label:
            "Sinta kembali membuat nastar dengan bantuan catatan yang ia tambahkan di buku resep",
        },
      ],
    },
  },
};

export default item;
