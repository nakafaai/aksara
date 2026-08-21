import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Viele Lernende berichten, dass die Erinnerungen ihnen bei den Fristen geholfen haben.",
      value: false,
    },
    {
      label:
        "Vergleichbare Klassen ohne App zeigten keinen Anstieg pünktlicher Abgaben.",
      value: false,
    },
    {
      label:
        "Die Schule verwendete in beiden Zeiträumen dieselbe Definition von „pünktlich“.",
      value: false,
    },
    {
      label: "Die App erinnert einen Tag vor jeder Abgabefrist.",
      value: false,
    },
    {
      label:
        "In derselben Woche wurde die Abgabefrist von 17 Uhr bis Mitternacht verlängert.",
      value: true,
    },
  ],
  en: [
    {
      label:
        "Many students report that the reminders helped them remember due dates.",
      value: false,
    },
    {
      label:
        "Comparable classes without the app showed no increase in on-time submissions.",
      value: false,
    },
    {
      label:
        "The school used the same definition of “on time” in both periods.",
      value: false,
    },
    {
      label: "The app sends a reminder one day before each deadline.",
      value: false,
    },
    {
      label:
        "In the same week, the submission deadline was extended from 5 p.m. to midnight.",
      value: true,
    },
  ],
  id: [
    {
      label:
        "Banyak siswa menyatakan bahwa pengingat membantu mereka mengingat tenggat.",
      value: false,
    },
    {
      label:
        "Kelas pembanding tanpa aplikasi tidak mengalami peningkatan pengumpulan tepat waktu.",
      value: false,
    },
    {
      label:
        "Sekolah menggunakan definisi “tepat waktu” yang sama pada kedua periode.",
      value: false,
    },
    {
      label: "Aplikasi mengirim pengingat sehari sebelum setiap tenggat.",
      value: false,
    },
    {
      label:
        "Pada minggu yang sama, tenggat pengumpulan diperpanjang dari pukul 17.00 hingga tengah malam.",
      value: true,
    },
  ],
};

export default choices;
