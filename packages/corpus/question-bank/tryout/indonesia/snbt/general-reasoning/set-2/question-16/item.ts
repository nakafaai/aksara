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
              text: "Bei Zahlung des Tätigkeitshonorars kann die Führungskraft den Mitarbeiter mit der Erstellung einer Meldung beauftragen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wenn der Tätigkeitsbericht nicht eingereicht wurde, bedeutet dies, dass das Managerhonorar nicht gezahlt wird",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wenn der Manager einen Bericht verlangt, wird die Aktivität sofort ausgeführt",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Wird das Honorar nicht ausgezahlt, wurde die Tätigkeit nicht durchgeführt",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Fehlt ein Honorar, kann die Tätigkeit nicht ausgeübt werden",
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
              text: "If the activity honorarium is paid, the manager can assign the employee to make a report",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "If the activity report has not been submitted, it means the manager's honorarium is not paid",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "If the manager asks for a report, the activity is immediately carried out",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "If the employee's honorarium is not paid, it means the activity has not been carried out",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "If there is no honorarium, the activity cannot be carried out",
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
              text: "Jika honor kegiatan dibayarkan, pimpinan dapat menugaskan karyawan membuat laporan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Laporan kegiatan belum diserahkan berarti honor pimpinan tidak dibayarkan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jika pimpinan meminta laporan, kegiatan segera dilaksanakan",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Honor karyawan tidak dibayarkan berarti kegiatan belum dilaksanakan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jika honor tidak ada, kegiatan tidak dapat dilaksanakan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
