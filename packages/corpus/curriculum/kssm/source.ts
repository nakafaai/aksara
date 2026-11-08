import { kssmForm4BiologyTopicNodes } from "#corpus/curriculum/kssm/form4/biology";
import { kssmForm4ChemistryTopicNodes } from "#corpus/curriculum/kssm/form4/chemistry";
import { kssmForm4MathematicsTopicNodes } from "#corpus/curriculum/kssm/form4/mathematics";
import { kssmForm4PhysicsTopicNodes } from "#corpus/curriculum/kssm/form4/physics";
import { kssmForm4PhysiologyTopicNodes } from "#corpus/curriculum/kssm/form4/physiology";
import { kssmForm5BiologyTopicNodes } from "#corpus/curriculum/kssm/form5/biology";
import { kssmForm5ChemistryTopicNodes } from "#corpus/curriculum/kssm/form5/chemistry";
import { kssmForm5MathematicsTopicNodes } from "#corpus/curriculum/kssm/form5/mathematics";
import { kssmForm5PhysicsTopicNodes } from "#corpus/curriculum/kssm/form5/physics";
import {
  classNode,
  defineCurriculum,
  subjectNode,
} from "#corpus/curriculum/schema";
import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

/** The upper secondary group of the KSSM classes, named in each locale. */
const UPPER_SECONDARY = {
  de: { title: "Sekundarstufe II" },
  en: { title: "Upper Secondary" },
  id: { title: "Sekolah Menengah Atas" },
  ms: { title: "Menengah Atas" },
};

/** The four KSSM science and mathematics subjects of Form 4. */
const form4SubjectNodes = [
  subjectNode({
    children: [...kssmForm4BiologyTopicNodes, ...kssmForm4PhysiologyTopicNodes],
    key: "form-4-biology",
    materialDomain: "biology",
    order: 10,
    translations: {
      de: { routeSlug: "biologie", title: "Biologie" },
      en: { routeSlug: "biology", title: "Biology" },
      id: { routeSlug: "biologi", title: "Biologi" },
      ms: { routeSlug: "biologi", title: "Biologi" },
    },
  }),
  subjectNode({
    children: kssmForm4ChemistryTopicNodes,
    key: "form-4-chemistry",
    materialDomain: "chemistry",
    order: 20,
    translations: {
      de: { routeSlug: "chemie", title: "Chemie" },
      en: { routeSlug: "chemistry", title: "Chemistry" },
      id: { routeSlug: "kimia", title: "Kimia" },
      ms: { routeSlug: "kimia", title: "Kimia" },
    },
  }),
  subjectNode({
    children: kssmForm4MathematicsTopicNodes,
    key: "form-4-mathematics",
    materialDomain: "mathematics",
    order: 30,
    translations: {
      de: { routeSlug: "mathematik", title: "Mathematik" },
      en: { routeSlug: "mathematics", title: "Mathematics" },
      id: { routeSlug: "matematika", title: "Matematika" },
      ms: { routeSlug: "matematik", title: "Matematik" },
    },
  }),
  subjectNode({
    children: kssmForm4PhysicsTopicNodes,
    key: "form-4-physics",
    materialDomain: "physics",
    order: 40,
    translations: {
      de: { routeSlug: "physik", title: "Physik" },
      en: { routeSlug: "physics", title: "Physics" },
      id: { routeSlug: "fisika", title: "Fisika" },
      ms: { routeSlug: "fizik", title: "Fizik" },
    },
  }),
];

/** The four KSSM science and mathematics subjects of Form 5. */
const form5SubjectNodes = [
  subjectNode({
    children: kssmForm5BiologyTopicNodes,
    key: "form-5-biology",
    materialDomain: "biology",
    order: 10,
    translations: {
      de: { routeSlug: "biologie", title: "Biologie" },
      en: { routeSlug: "biology", title: "Biology" },
      id: { routeSlug: "biologi", title: "Biologi" },
      ms: { routeSlug: "biologi", title: "Biologi" },
    },
  }),
  subjectNode({
    children: kssmForm5ChemistryTopicNodes,
    key: "form-5-chemistry",
    materialDomain: "chemistry",
    order: 20,
    translations: {
      de: { routeSlug: "chemie", title: "Chemie" },
      en: { routeSlug: "chemistry", title: "Chemistry" },
      id: { routeSlug: "kimia", title: "Kimia" },
      ms: { routeSlug: "kimia", title: "Kimia" },
    },
  }),
  subjectNode({
    children: kssmForm5MathematicsTopicNodes,
    key: "form-5-mathematics",
    materialDomain: "mathematics",
    order: 30,
    translations: {
      de: { routeSlug: "mathematik", title: "Mathematik" },
      en: { routeSlug: "mathematics", title: "Mathematics" },
      id: { routeSlug: "matematika", title: "Matematika" },
      ms: { routeSlug: "matematik", title: "Matematik" },
    },
  }),
  subjectNode({
    children: kssmForm5PhysicsTopicNodes,
    key: "form-5-physics",
    materialDomain: "physics",
    order: 40,
    translations: {
      de: { routeSlug: "physik", title: "Physik" },
      en: { routeSlug: "physics", title: "Physics" },
      id: { routeSlug: "fisika", title: "Fisika" },
      ms: { routeSlug: "fizik", title: "Fizik" },
    },
  }),
];

/**
 * The KSSM tree of Form 4 and Form 5, with the chapters of the DSKP of
 * Matematik, Fizik, Kimia and Biologi. A chapter that a Nakafa lesson teaches
 * holds that lesson; the others stand in the tree until their lesson is written.
 */
export const kssmCurriculum = defineCurriculum({
  programKey: LEARNING_PROGRAM_KEYS.kssm,
  tree: [
    classNode({
      children: form4SubjectNodes,
      displayGroup: UPPER_SECONDARY,
      displayGroupIconKey: "high-school",
      iconKey: "grade-10",
      key: "form-4",
      order: 40,
      translations: {
        de: { routeSlug: "form-4", title: "Form 4" },
        en: { routeSlug: "form-4", title: "Form 4" },
        id: { routeSlug: "tingkatan-4", title: "Tingkatan 4" },
        ms: { routeSlug: "tingkatan-4", title: "Tingkatan 4" },
      },
    }),
    classNode({
      children: form5SubjectNodes,
      displayGroup: UPPER_SECONDARY,
      displayGroupIconKey: "high-school",
      iconKey: "grade-11",
      key: "form-5",
      order: 50,
      translations: {
        de: { routeSlug: "form-5", title: "Form 5" },
        en: { routeSlug: "form-5", title: "Form 5" },
        id: { routeSlug: "tingkatan-5", title: "Tingkatan 5" },
        ms: { routeSlug: "tingkatan-5", title: "Tingkatan 5" },
      },
    }),
  ],
});
