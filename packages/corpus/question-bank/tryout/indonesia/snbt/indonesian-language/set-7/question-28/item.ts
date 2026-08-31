import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Aula menjadi tenang karena semua sumber bunyi yang disebutkan pada awal cerita menghilang pada penutup.",
        },
        {
          isCorrect: false,
          label:
            "Suasana tetap sama karena bel dan tombol masih terdengar, sehingga tindakan tokoh tidak memberi perubahan apa pun.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan suasana membuktikan bahwa keramaian selalu menghalangi munculnya rasa ingin tahu di pameran.",
        },
        {
          isCorrect: false,
          label:
            "Percakapan menjadi terarah karena Lila menyelesaikan perdebatan dengan memberi jawaban yang benar.",
        },
        {
          isCorrect: true,
          label:
            "Keramaian fisik tetap ada, tetapi pilihan bunyi dan tindakan pada penutup memperlihatkan terbentuknya ruang perhatian di tengah keramaian itu.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
