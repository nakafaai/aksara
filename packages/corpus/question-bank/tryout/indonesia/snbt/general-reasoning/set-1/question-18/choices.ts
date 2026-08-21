import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Das neue Büro liegt weiter von den Wohnungen der meisten Beschäftigten entfernt.",
      value: false,
    },
    {
      label:
        "Die meisten Kündigungen waren bereits vor der Bekanntgabe des Umzugs eingereicht worden.",
      value: true,
    },
    {
      label:
        "Durch den Umzug verdoppelte sich die durchschnittliche Pendelzeit.",
      value: false,
    },
    {
      label:
        "Die Miete des neuen Büros ist niedriger als die des bisherigen Büros.",
      value: false,
    },
    {
      label:
        "Das Unternehmen zog nach Ablauf des Mietvertrags für das bisherige Gebäude um.",
      value: false,
    },
  ],
  en: [
    {
      label: "The new office is farther from most employees' homes.",
      value: false,
    },
    {
      label:
        "Most resignation letters had been submitted before the relocation was announced.",
      value: true,
    },
    {
      label: "The relocation doubled the average commuting time.",
      value: false,
    },
    {
      label: "The rent at the new office is lower than at the former office.",
      value: false,
    },
    {
      label: "The company moved after the former building lease expired.",
      value: false,
    },
  ],
  id: [
    {
      label: "Kantor baru lebih jauh dari rumah sebagian besar karyawan.",
      value: false,
    },
    {
      label:
        "Sebagian besar surat pengunduran diri telah diajukan sebelum rencana perpindahan diumumkan.",
      value: true,
    },
    {
      label:
        "Perpindahan itu menggandakan rata-rata waktu perjalanan ke kantor.",
      value: false,
    },
    {
      label: "Biaya sewa kantor baru lebih rendah daripada kantor lama.",
      value: false,
    },
    {
      label: "Perusahaan pindah setelah masa sewa gedung lama berakhir.",
      value: false,
    },
  ],
};

export default choices;
