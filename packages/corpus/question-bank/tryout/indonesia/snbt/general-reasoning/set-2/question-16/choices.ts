import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Bei Zahlung des Tätigkeitshonorars kann die Führungskraft den Mitarbeiter mit der Erstellung einer Meldung beauftragen",
      value: false,
    },
    {
      label:
        "Wenn der Tätigkeitsbericht nicht eingereicht wurde, bedeutet dies, dass das Managerhonorar nicht gezahlt wird",
      value: false,
    },
    {
      label:
        "Wenn der Manager einen Bericht verlangt, wird die Aktivität sofort ausgeführt",
      value: false,
    },
    {
      label:
        "Wird das Honorar nicht ausgezahlt, wurde die Tätigkeit nicht durchgeführt",
      value: true,
    },
    {
      label: "Fehlt ein Honorar, kann die Tätigkeit nicht ausgeübt werden",
      value: false,
    },
  ],
  en: [
    {
      label:
        "If the activity honorarium is paid, the manager can assign the employee to make a report",
      value: false,
    },
    {
      label:
        "If the activity report has not been submitted, it means the manager's honorarium is not paid",
      value: false,
    },
    {
      label:
        "If the manager asks for a report, the activity is immediately carried out",
      value: false,
    },
    {
      label:
        "If the employee's honorarium is not paid, it means the activity has not been carried out",
      value: true,
    },
    {
      label: "If there is no honorarium, the activity cannot be carried out",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Jika honor kegiatan dibayarkan, pimpinan dapat menugaskan karyawan membuat laporan",
      value: false,
    },
    {
      label:
        "Laporan kegiatan belum diserahkan berarti honor pimpinan tidak dibayarkan",
      value: false,
    },
    {
      label: "Jika pimpinan meminta laporan, kegiatan segera dilaksanakan",
      value: false,
    },
    {
      label:
        "Honor karyawan tidak dibayarkan berarti kegiatan belum dilaksanakan",
      value: true,
    },
    {
      label: "Jika honor tidak ada, kegiatan tidak dapat dilaksanakan",
      value: false,
    },
  ],
};

export default choices;
