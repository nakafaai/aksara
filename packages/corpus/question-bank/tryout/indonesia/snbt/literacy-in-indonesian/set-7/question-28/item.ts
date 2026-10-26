import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Aula menjadi tenang karena semua sumber bunyi yang disebutkan pada awal cerita menghilang pada penutup.",
        },
        {
          correct: false,
          label:
            "Suasana tetap sama karena bel dan tombol masih terdengar, sehingga tindakan tokoh tidak memberi perubahan apa pun.",
        },
        {
          correct: false,
          label:
            "Perubahan suasana membuktikan bahwa keramaian selalu menghalangi munculnya rasa ingin tahu di pameran.",
        },
        {
          correct: false,
          label:
            "Percakapan menjadi terarah karena Lila menyelesaikan perdebatan dengan memberi jawaban yang benar.",
        },
        {
          correct: true,
          label:
            "Keramaian fisik tetap ada, tetapi pilihan bunyi dan tindakan pada penutup memperlihatkan terbentuknya ruang perhatian di tengah keramaian itu.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
