import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Tägliches Trinken von grünem Tee beseitigt Akne nachweislich.",
      value: false,
    },
    {
      label:
        "Oral eingenommener grüner Tee wird auf mögliche Hautwirkungen untersucht, doch die Evidenz rechtfertigt weder ein Heilversprechen bei Akne noch eine sichere Vorbeugung gegen lichtbedingte Hautalterung.",
      value: true,
    },
    {
      label:
        "Klinische Studien haben bewiesen, dass grüner Tee jede Form UV-bedingter Hautschädigung verhindert.",
      value: false,
    },
    {
      label: "Grüner Tee kann bewährten Sonnenschutz ersetzen.",
      value: false,
    },
    {
      label:
        "Konzentrierte Grünteepräparate sind nachweislich für alle Menschen sicher, weil sie pflanzlich sind.",
      value: false,
    },
  ],
  en: [
    {
      label: "Drinking green tea every day is a proven way to eliminate acne.",
      value: false,
    },
    {
      label:
        "Oral green tea is being studied for possible skin effects, but the evidence does not justify promising that it treats acne or prevents photoaging.",
      value: true,
    },
    {
      label:
        "Clinical studies have proved that green tea prevents every form of UV-related skin damage.",
      value: false,
    },
    {
      label: "Drinking green tea can replace established sun protection.",
      value: false,
    },
    {
      label:
        "Concentrated green tea supplements are proven safe for everyone because they are herbal.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Minum teh hijau setiap hari terbukti mampu menghilangkan jerawat.",
      value: false,
    },
    {
      label:
        "Teh hijau oral sedang diteliti untuk kemungkinan efek pada kulit, tetapi buktinya belum cukup untuk menjanjikan bahwa teh hijau mengatasi jerawat atau mencegah penuaan akibat cahaya.",
      value: true,
    },
    {
      label:
        "Studi klinis telah membuktikan bahwa teh hijau mencegah semua bentuk kerusakan kulit akibat UV.",
      value: false,
    },
    {
      label:
        "Minum teh hijau dapat menggantikan perlindungan matahari yang sudah mapan.",
      value: false,
    },
    {
      label:
        "Suplemen ekstrak teh hijau pekat terbukti aman untuk semua orang karena berasal dari tumbuhan.",
      value: false,
    },
  ],
};

export default choices;
