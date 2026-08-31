import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In Bussen ohne Freiwillige und mit gleichen Fahrerhinweisen senkt eine aktuelle Normbotschaft weiterhin die beobachteten lauten Gespräche.",
        },
        {
          isCorrect: false,
          label:
            "Zusätzliche Plakate am Ausgang erhöhen die Erinnerung an die Botschaft, während die Beobachtungskriterien für laute Gespräche unverändert bleiben.",
        },
        {
          isCorrect: true,
          label:
            "Vollständige Aufnahmen zeigen keine Veränderung; Beschwerden sanken nur wegen ausgefallener Meldewege in Bussen mit neuem Plakat.",
        },
        {
          isCorrect: false,
          label:
            "Der Betreiber wird Mehrheitszahlen aus aktuellen Beobachtungen verwenden.",
        },
        {
          isCorrect: false,
          label:
            "Anonyme Beobachter verwendeten vorab festgelegte Lautstärkekriterien.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "On buses without volunteers and with identical driver guidance, an up-to-date norm message still reduces observed loud conversations.",
        },
        {
          isCorrect: false,
          label:
            "Additional posters near the exit increase recall of the message while the observation criteria for loud conversations remain unchanged.",
        },
        {
          isCorrect: true,
          label:
            "Complete recordings show no change in loud conversations; complaints fell only because reporting channels failed on buses with the new poster.",
        },
        {
          isCorrect: false,
          label:
            "The operator will use majority figures drawn from recent observations.",
        },
        {
          isCorrect: false,
          label: "Anonymous observers used predefined volume criteria.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pada bus tanpa relawan dengan pengarahan pengemudi yang sama, pesan norma terbaru tetap menurunkan hitungan percakapan keras.",
        },
        {
          isCorrect: false,
          label:
            "Poster tambahan di dekat pintu keluar meningkatkan ingatan terhadap pesan, sedangkan kriteria pengamatan percakapan keras tetap sama.",
        },
        {
          isCorrect: true,
          label:
            "Rekaman lengkap menunjukkan percakapan keras tidak berubah; keluhan turun hanya karena saluran pelaporan tidak berfungsi pada bus berposter baru.",
        },
        {
          isCorrect: false,
          label:
            "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru.",
        },
        {
          isCorrect: false,
          label:
            "Pengamat anonim memakai kriteria volume yang telah ditetapkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
