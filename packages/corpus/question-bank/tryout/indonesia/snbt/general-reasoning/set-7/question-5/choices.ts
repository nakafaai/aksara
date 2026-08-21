import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Budi hat in diesem Monat nicht jede planmäßige Trainingseinheit absolviert.",
      value: true,
    },
    { label: "Budi mag keine Radrennen.", value: false },
    { label: "Budi kann niemals ein Radrennen gewinnen.", value: false },
    {
      label: "Budi hat in diesem Monat überhaupt nicht trainiert.",
      value: false,
    },
    {
      label: "Budi ist von allen Langstreckenradrennen ausgeschlossen.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Budi did not complete every scheduled practice session this month.",
      value: true,
    },
    { label: "Budi does not like bicycle racing.", value: false },
    { label: "Budi can never win a bicycle race.", value: false },
    { label: "Budi did not practice cycling at all this month.", value: false },
    {
      label: "Budi is barred from every long-distance bicycle race.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Budi tidak menyelesaikan setiap sesi latihan yang dijadwalkan bulan ini.",
      value: true,
    },
    { label: "Budi tidak menyukai balap sepeda.", value: false },
    { label: "Budi tidak akan pernah bisa menang balap sepeda.", value: false },
    {
      label: "Budi sama sekali tidak berlatih sepeda bulan ini.",
      value: false,
    },
    {
      label: "Budi dilarang mengikuti semua balap sepeda jarak jauh.",
      value: false,
    },
  ],
};

export default choices;
