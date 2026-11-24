import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

const MONOHYBRID_CROSSES = ["pureF1", "heteroF2", "testCross"] as const;
const DIHYBRID_VIEWS = [
  "all",
  "dominantBoth",
  "recombinants",
  "recessiveBoth",
] as const;
const HUMAN_PATTERNS = ["aboBlood", "sexDetermination", "xLinked"] as const;

/**
 * Props of `MonohybridCrossLab`: a 3D interactive Punnett board and pea-plant
 * offspring row for Mendel's monohybrid crosses (TT x tt, Tt x Tt, Tt x tt)
 * illustrating dominance and the Law of Segregation. Genotype and phenotype
 * ratio readouts are optional answer state.
 */
function monohybridCrossLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      crosses: Schema.NonEmptyArray(Schema.Literals(MONOHYBRID_CROSSES)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        cross: TextSchema,
        crosses: byPickedIds(
          MONOHYBRID_CROSSES,
          Schema.Struct({
            genotypeRatio: rich,
            name: TextSchema,
            phenotypeRatio: rich,
          })
        ),
        genotypeRatio: Schema.optionalKey(rich),
        parts: byIds(
          ["parentA", "parentB", "gamete", "tallPea", "dwarfPea"],
          TextSchema
        ),
        phenotypeRatio: Schema.optionalKey(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ crosses, labels }) => namesEach(crosses, labels.crosses),
        {
          message:
            "Expected a name, genotype ratio, and phenotype ratio for every monohybrid cross shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "genotypeRatio"], ["labels", "phenotypeRatio"])
  );
}

/**
 * Props of `DihybridCrossLab`: a 3D 4x4 Punnett cube of round/wrinkled and
 * yellow/green pea seeds from RrYy x RrYy, highlighting parental and
 * recombinant phenotypes in the 9:3:3:1 ratio. Ratio and count readouts are
 * optional answer state.
 */
function dihybridCrossLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      filters: Schema.NonEmptyArray(Schema.Literals(DIHYBRID_VIEWS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        count: Schema.optionalKey(rich),
        filter: TextSchema,
        filters: byPickedIds(
          DIHYBRID_VIEWS,
          Schema.Struct({
            count: rich,
            name: TextSchema,
            ratio: rich,
          })
        ),
        parts: byIds(
          ["roundYellow", "roundGreen", "wrinkledYellow", "wrinkledGreen"],
          TextSchema
        ),
        ratio: Schema.optionalKey(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ filters, labels }) => namesEach(filters, labels.filters),
        {
          message:
            "Expected a name, count, and ratio for every dihybrid filter shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "count"], ["labels", "ratio"])
  );
}

/**
 * Props of `PedigreeSexLinkedLab`: a 3D human inheritance and family pedigree
 * explorer contrasting ABO blood-group codominance, XX/XY sex determination,
 * and X-linked recessive inheritance across three generations. Carrier risk
 * and inheritance pattern readouts are optional answer state.
 */
function pedigreeSexLinkedLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        parts: byIds(
          [
            "male",
            "female",
            "carrier",
            "affected",
            "xChromosome",
            "yChromosome",
          ],
          TextSchema
        ),
        pattern: TextSchema,
        patterns: byPickedIds(
          HUMAN_PATTERNS,
          Schema.Struct({
            name: TextSchema,
            risk: rich,
            rule: rich,
          })
        ),
        risk: Schema.optionalKey(rich),
        rule: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      patterns: Schema.NonEmptyArray(Schema.Literals(HUMAN_PATTERNS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, patterns }) => namesEach(patterns, labels.patterns),
        {
          message:
            "Expected a name, rule, and risk note for every human inheritance pattern shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "risk"], ["labels", "rule"])
  );
}

/**
 * Mendelian and human inheritance labs covering monohybrid crosses, dihybrid
 * 9:3:3:1 grids, and human blood-group and X-linked pedigree analysis.
 */
export function mendelianVisuals<E>(rich: RichSlot<E>) {
  return {
    DihybridCrossLab: dihybridCrossLab(rich),
    MonohybridCrossLab: monohybridCrossLab(rich),
    PedigreeSexLinkedLab: pedigreeSexLinkedLab(rich),
  };
}
