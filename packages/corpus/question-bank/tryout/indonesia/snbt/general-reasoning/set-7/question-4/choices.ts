import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Arin's session continues without interruption.", value: false },
    {
      label: "Arin's access badge remains active during the review.",
      value: false,
    },
    { label: "Arin's access badge is suspended pending review.", value: true },
    { label: "The supervisor's access badge is suspended.", value: false },
    {
      label: "The laser cutter is permanently removed from the laboratory.",
      value: false,
    },
  ],
  id: [
    { label: "Sesi Arin berlanjut tanpa dihentikan.", value: false },
    {
      label: "Kartu akses Arin tetap aktif selama peninjauan.",
      value: false,
    },
    {
      label: "Kartu akses Arin ditangguhkan sampai peninjauan selesai.",
      value: true,
    },
    { label: "Kartu akses pengawas ditangguhkan.", value: false },
    {
      label:
        "Mesin pemotong laser dikeluarkan secara permanen dari laboratorium.",
      value: false,
    },
  ],
};

export default choices;
