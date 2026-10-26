import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pembaca mengetahui bahwa penyunting sengaja meremehkan Laras karena seluruh niat tokoh disampaikan oleh narator.",
        },
        {
          correct: false,
          label:
            "Pembaca dapat memastikan foto lama di arsip sekolah palsu karena Laras mempertimbangkan untuk menyalinnya.",
        },
        {
          correct: false,
          label:
            "Pembaca memperoleh gambaran objektif tentang semua peristiwa karena sudut pandang Laras tidak membatasi informasi.",
        },
        {
          correct: true,
          label:
            "Pembaca dekat dengan kecemasan dan pertimbangan Laras, tetapi tidak boleh menganggap tafsir Laras atas pertanyaan penyunting sebagai fakta tentang niat penyunting.",
        },
        {
          correct: false,
          label:
            "Pembaca hanya mengetahui tindakan luar Laras sehingga perubahan makna ikon waktu tidak dapat dipahami.",
        },
      ],
    },
  },
};

export default item;
