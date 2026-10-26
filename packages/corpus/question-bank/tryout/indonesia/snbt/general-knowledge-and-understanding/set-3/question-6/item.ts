import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "memeriksa satu sumber berulang kali sampai keterangannya tampak konsisten",
        },
        {
          correct: false,
          label:
            "memilih kisah yang paling hidup tanpa menilai asal dan proses pembentukannya",
        },
        {
          correct: false,
          label:
            "memberi bobot yang sama kepada semua sumber tanpa melihat konteksnya",
        },
        {
          correct: false,
          label:
            "menyunting perbedaan kata sampai seluruh keterangan tampak seragam",
        },
        {
          correct: true,
          label:
            "membandingkan beberapa sumber yang berdiri sendiri sebelum menetapkan kesimpulan",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
