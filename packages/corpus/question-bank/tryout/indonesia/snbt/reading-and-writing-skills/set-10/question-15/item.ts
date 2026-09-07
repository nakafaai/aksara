import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Der Wert der ohne erneute Nachfrage am Ziel angekommenen Personen war höher. Dennoch blieb die Aussage auf den kurzen Versuch an einem Parkeingang begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Wert der ohne erneute Nachfrage am Ziel angekommenen Personen war höher. Deshalb blieb die Aussage auf den kurzen Versuch an einem Parkeingang begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Wert der ohne erneute Nachfrage am Ziel angekommenen Personen war höher. Außerdem blieb die Aussage auf den kurzen Versuch an einem Parkeingang begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Wert der ohne erneute Nachfrage am Ziel angekommenen Personen war höher. Zuvor blieb die Aussage auf den kurzen Versuch an einem Parkeingang begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Wert der ohne erneute Nachfrage am Ziel angekommenen Personen war höher. Folglich blieb die Aussage auf den kurzen Versuch an einem Parkeingang begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The value for visitors reaching their destination without asking again was higher. Nevertheless, the conclusion remained limited to the short trial at one park entrance.",
        },
        {
          isCorrect: false,
          label:
            "The value for visitors reaching their destination without asking again was higher. Therefore, the conclusion remained limited to the short trial at one park entrance.",
        },
        {
          isCorrect: false,
          label:
            "The value for visitors reaching their destination without asking again was higher. Moreover, the conclusion remained limited to the short trial at one park entrance.",
        },
        {
          isCorrect: false,
          label:
            "The value for visitors reaching their destination without asking again was higher. Previously, the conclusion remained limited to the short trial at one park entrance.",
        },
        {
          isCorrect: false,
          label:
            "The value for visitors reaching their destination without asking again was higher. Consequently, the conclusion remained limited to the short trial at one park entrance.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Namun, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Oleh karena itu, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Selain itu, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Sebelumnya, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Akibatnya, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
