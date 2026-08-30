import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Viele Lernende berichten, dass die Erinnerungen ihnen bei den Fristen geholfen haben.",
        },
        {
          isCorrect: false,
          label:
            "Vergleichbare Klassen ohne App zeigten keinen Anstieg pünktlicher Abgaben.",
        },
        {
          isCorrect: false,
          label:
            "Die Schule verwendete in beiden Zeiträumen dieselbe Definition von „pünktlich“.",
        },
        {
          isCorrect: false,
          label: "Die App erinnert einen Tag vor jeder Abgabefrist.",
        },
        {
          isCorrect: true,
          label:
            "In derselben Woche wurde die Abgabefrist von 17 Uhr bis Mitternacht verlängert.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Many students report that the reminders helped them remember due dates.",
        },
        {
          isCorrect: false,
          label:
            "Comparable classes without the app showed no increase in on-time submissions.",
        },
        {
          isCorrect: false,
          label:
            "The school used the same definition of “on time” in both periods.",
        },
        {
          isCorrect: false,
          label: "The app sends a reminder one day before each deadline.",
        },
        {
          isCorrect: true,
          label:
            "In the same week, the submission deadline was extended from 5 p.m. to midnight.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Banyak siswa menyatakan bahwa pengingat membantu mereka mengingat tenggat.",
        },
        {
          isCorrect: false,
          label:
            "Kelas pembanding tanpa aplikasi tidak mengalami peningkatan pengumpulan tepat waktu.",
        },
        {
          isCorrect: false,
          label:
            "Sekolah menggunakan definisi “tepat waktu” yang sama pada kedua periode.",
        },
        {
          isCorrect: false,
          label: "Aplikasi mengirim pengingat sehari sebelum setiap tenggat.",
        },
        {
          isCorrect: true,
          label:
            "Pada minggu yang sama, tenggat pengumpulan diperpanjang dari pukul 17.00 hingga tengah malam.",
        },
      ],
    },
  },
};

export default item;
