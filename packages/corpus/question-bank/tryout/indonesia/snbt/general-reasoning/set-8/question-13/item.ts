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
              text: "Viele Lernende berichten, dass die Erinnerungen ihnen bei den Fristen geholfen haben.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Vergleichbare Klassen ohne App zeigten keinen Anstieg pünktlicher Abgaben.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Schule verwendete in beiden Zeiträumen dieselbe Definition von „pünktlich“.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die App erinnert einen Tag vor jeder Abgabefrist.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "In derselben Woche wurde die Abgabefrist von 17 Uhr bis Mitternacht verlängert.",
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
              text: "Many students report that the reminders helped them remember due dates.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Comparable classes without the app showed no increase in on-time submissions.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The school used the same definition of “on time” in both periods.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The app sends a reminder one day before each deadline.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "In the same week, the submission deadline was extended from 5 p.m. to midnight.",
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
              text: "Banyak siswa menyatakan bahwa pengingat membantu mereka mengingat tenggat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kelas pembanding tanpa aplikasi tidak mengalami peningkatan pengumpulan tepat waktu.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sekolah menggunakan definisi “tepat waktu” yang sama pada kedua periode.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Aplikasi mengirim pengingat sehari sebelum setiap tenggat.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pada minggu yang sama, tenggat pengumpulan diperpanjang dari pukul 17.00 hingga tengah malam.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
