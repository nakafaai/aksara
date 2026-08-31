import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Teilnehmende berichten, dass die Mentorinnen und Mentoren hilfreiches Karrierefeedback geben.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahl der Anmeldungen zum Mentoringprogramm ist im Laufe des Jahres gestiegen.",
        },
        {
          isCorrect: false,
          label:
            "Eine unabhängige Prüfung bestätigt die angegebene Verlängerungsquote.",
        },
        {
          isCorrect: false,
          label:
            "Mehrere Abteilungen planen für das nächste Jahr zusätzliche Mentoringsitzungen.",
        },
        {
          isCorrect: true,
          label:
            "Verträge verlängern sich automatisch, wenn Beschäftigte nicht aktiv widersprechen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Participants report that mentors provide useful career feedback.",
        },
        {
          isCorrect: false,
          label:
            "Enrollment in the mentoring program increased during the year.",
        },
        {
          isCorrect: false,
          label:
            "An independent audit confirms the reported contract-renewal rate.",
        },
        {
          isCorrect: false,
          label:
            "Several departments plan to offer more mentoring sessions next year.",
        },
        {
          isCorrect: true,
          label:
            "Contracts renew automatically unless employees submit an opt-out form.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Peserta menyatakan bahwa pendamping memberikan masukan karier yang berguna.",
        },
        {
          isCorrect: false,
          label:
            "Jumlah pendaftar program pendampingan meningkat sepanjang tahun.",
        },
        {
          isCorrect: false,
          label:
            "Audit independen membenarkan angka perpanjangan kontrak yang dilaporkan.",
        },
        {
          isCorrect: false,
          label:
            "Beberapa departemen berencana menambah sesi pendampingan tahun depan.",
        },
        {
          isCorrect: true,
          label:
            "Kontrak diperpanjang otomatis kecuali pekerja mengirim formulir penolakan.",
        },
      ],
    },
  },
};

export default item;
