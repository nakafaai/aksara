import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Datenprüfung wurde bestanden.", value: false },
    { label: "Der Bericht wurde veröffentlicht.", value: false },
    {
      label: "Der Bericht wurde veröffentlicht, aber nicht archiviert.",
      value: false,
    },
    { label: "Die Datenprüfung wurde nicht bestanden.", value: true },
    { label: "Aus den Angaben lässt sich nichts folgern.", value: false },
  ],
  en: [
    { label: "The data audit passed.", value: false },
    { label: "The report was published.", value: false },
    { label: "The report was published but not archived.", value: false },
    { label: "The data audit did not pass.", value: true },
    { label: "Nothing can be concluded from the information.", value: false },
  ],
  id: [
    { label: "Audit data lulus.", value: false },
    { label: "Laporan diterbitkan.", value: false },
    { label: "Laporan diterbitkan, tetapi tidak diarsipkan.", value: false },
    { label: "Audit data tidak lulus.", value: true },
    { label: "Tidak ada simpulan yang dapat ditarik.", value: false },
  ],
};

export default choices;
