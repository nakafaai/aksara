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
              text: "Teilnehmende berichten, dass die Mentorinnen und Mentoren hilfreiches Karrierefeedback geben.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Zahl der Anmeldungen zum Mentoringprogramm ist im Laufe des Jahres gestiegen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eine unabhängige Prüfung bestätigt die angegebene Verlängerungsquote.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Verträge verlängern sich automatisch, wenn Beschäftigte nicht aktiv widersprechen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mehrere Abteilungen planen für das nächste Jahr zusätzliche Mentoringsitzungen.",
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
              text: "Participants report that mentors provide useful career feedback.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Enrollment in the mentoring program increased during the year.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "An independent audit confirms the reported contract-renewal rate.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Contracts renew automatically unless employees submit an opt-out form.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Several departments plan to offer more mentoring sessions next year.",
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
              text: "Peserta menyatakan bahwa pendamping memberikan masukan karier yang berguna.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jumlah pendaftar program pendampingan meningkat sepanjang tahun.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Audit independen membenarkan angka perpanjangan kontrak yang dilaporkan.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kontrak diperpanjang otomatis kecuali pekerja mengirim formulir penolakan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Beberapa departemen berencana menambah sesi pendampingan tahun depan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
