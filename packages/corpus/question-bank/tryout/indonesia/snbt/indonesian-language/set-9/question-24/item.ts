import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pembaca mengetahui bahwa penyunting sengaja meremehkan Laras karena seluruh niat tokoh disampaikan oleh narator.",
        },
        {
          isCorrect: false,
          label:
            "Pembaca dapat memastikan foto 2019 di arsip sekolah palsu karena Laras mempertimbangkan untuk menyalinnya.",
        },
        {
          isCorrect: false,
          label:
            "Pembaca memperoleh gambaran objektif tentang semua peristiwa karena sudut pandang Laras tidak membatasi informasi.",
        },
        {
          isCorrect: true,
          label:
            "Pembaca dekat dengan kecemasan dan pertimbangan Laras, tetapi tidak boleh menganggap tafsir Laras atas pertanyaan penyunting sebagai fakta tentang niat penyunting.",
        },
        {
          isCorrect: false,
          label:
            "Pembaca hanya mengetahui tindakan luar Laras sehingga perubahan makna ikon waktu tidak dapat dipahami.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
