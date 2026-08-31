import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Im zweiten Test wählten neue Teilnehmer Route und Abfahrtszeit genauer.",
        },
        {
          isCorrect: false,
          label:
            "Eine Notfallnachricht muss Bedeutung und Handlung in verständlicher Sprache bewahren, statt nur die amtliche Wortfolge zu kopieren.",
        },
        {
          isCorrect: false,
          label:
            "Einige Sprecher halten eine Übersetzung entlang der ursprünglichen Wortfolge für am sichersten.",
        },
        {
          isCorrect: false,
          label:
            "Jede Fassung wird vor dem Einsatz erneut mit Bewohnern getestet.",
        },
        {
          isCorrect: false,
          label:
            "Eine im zweiten Test erfolgreiche Übersetzung kann sicher überall unverändert eingesetzt werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "In the second test, new participants chose the route and departure time more accurately.",
        },
        {
          isCorrect: false,
          label:
            "An emergency message must preserve meaning and action in language residents understand, not merely copy official word order.",
        },
        {
          isCorrect: false,
          label:
            "Some announcers believe the safest translation is one that follows the source word order.",
        },
        {
          isCorrect: false,
          label: "Each version will be tested again with residents before use.",
        },
        {
          isCorrect: false,
          label:
            "A translation that passes the second test can certainly be used unchanged in every region.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada uji kedua, peserta baru memilih rute dan waktu berangkat dengan lebih tepat.",
        },
        {
          isCorrect: false,
          label:
            "Pesan darurat perlu mempertahankan makna dan tindakan melalui bahasa yang dipahami warga, bukan sekadar menyalin urutan kata resmi.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian penyiar menganggap terjemahan paling aman adalah terjemahan yang mengikuti urutan kata sumber.",
        },
        {
          isCorrect: false,
          label:
            "Setiap versi akan diuji lagi bersama warga sebelum digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Satu terjemahan yang lulus uji kedua pasti dapat digunakan tanpa perubahan di seluruh daerah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
