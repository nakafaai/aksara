import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tägliches Trinken von grünem Tee beseitigt Akne nachweislich.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Oral eingenommener grüner Tee wird auf mögliche Hautwirkungen untersucht, doch die Evidenz rechtfertigt weder ein Heilversprechen bei Akne noch eine sichere Vorbeugung gegen lichtbedingte Hautalterung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Klinische Studien haben bewiesen, dass grüner Tee jede Form UV-bedingter Hautschädigung verhindert.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Grüner Tee kann bewährten Sonnenschutz ersetzen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Konzentrierte Grünteepräparate sind nachweislich für alle Menschen sicher, weil sie pflanzlich sind.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Drinking green tea every day is a proven way to eliminate acne.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Oral green tea is being studied for possible skin effects, but the evidence does not justify promising that it treats acne or prevents photoaging.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Clinical studies have proved that green tea prevents every form of UV-related skin damage.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Drinking green tea can replace established sun protection.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Concentrated green tea supplements are proven safe for everyone because they are herbal.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Minum teh hijau setiap hari terbukti mampu menghilangkan jerawat.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Teh hijau oral sedang diteliti untuk kemungkinan efek pada kulit, tetapi buktinya belum cukup untuk menjanjikan bahwa teh hijau mengatasi jerawat atau mencegah penuaan akibat cahaya.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Studi klinis telah membuktikan bahwa teh hijau mencegah semua bentuk kerusakan kulit akibat UV.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Minum teh hijau dapat menggantikan perlindungan matahari yang sudah mapan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Suplemen ekstrak teh hijau pekat terbukti aman untuk semua orang karena berasal dari tumbuhan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
