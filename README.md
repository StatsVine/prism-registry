# PRISM Registry

**PRISM Registry** provides enriched player metadata — names, birth dates, MLB roster affiliations, and more — built on top of the core identity mappings from [PRISM Crosswalk](https://github.com/StatsVine/prism-crosswalk). While Crosswalk is the authoritative source of player IDs across data providers, Registry adds the human-readable context needed to use those IDs in applications, APIs, and research.

This repository contains the **build artifacts and schemas** — the generated JSON, CSV, and NDJSON files that most consumers should use directly. Raw player metadata is derived from Crosswalk's ID mappings and multiple upstream sources, then processed into clean, consistent datasets.

## Using the Data

| What you want | Where to go |
|---|---|
| Browse or query player metadata via JSON API | [registry.prism.statsvine.com](https://registry.prism.statsvine.com) |
| Consume the data in CSV, JSON, or NDJSON | [github.com/StatsVine/prism-registry](https://github.com/StatsVine/prism-registry) (this repo — build artifacts) |
| Source player identity mappings (IDs only) | [github.com/StatsVine/prism-crosswalk](https://github.com/StatsVine/prism-crosswalk) |

## Philosophy
- **Enrichment, not source**: Registry is a derived dataset. It enriches Crosswalk's stable ID mappings with additional metadata. It does not define player identities.
- **Consistent schemas**: Each dataset follows a predictable schema, versioned for stability. Schema changes are rare and clearly communicated.
- **Build artifacts only**: The primary output is pre-generated files in multiple formats. We do not host live databases or APIs (though a JSON API is available at registry.prism.statsvine.com).
- **Open and reproducible**: All datasets are generated from public upstream sources and Crosswalk. Anyone can replicate the build.

## Why This Exists
- **Crosswalk gives you IDs, but not context**: Crosswalk focuses on player identity mappings. To use those IDs you often need names, birth dates, team rosters, and other metadata — that's what Registry provides.
- **Consistent metadata across sources**: Merging metadata from MLB, FanGraphs, and other providers is error-prone. Registry normalizes it into a single, reliable set.
- **Ready-to-use artifacts**: Instead of wiring up your own enrichment pipeline, you can download or query these pre-built datasets.

## Who this is for
If you already use Crosswalk and need player metadata to build applications, power databases, or run analysis:

- **Data Engineers** who need enriched player records for their pipelines.
- **API Builders** who want to serve player metadata alongside ID mappings.
- **Researchers** who need complete player profiles with name, birth date, and team context.
- **App Developers** building sports tools that require display-ready player information.

## Who this isn't for
- **Need only IDs?** Use Crosswalk directly — this dataset includes metadata that may be redundant for identity-only workflows.
- **Need real-time roster updates?** Registry is updated daily but is not a live API. For near-real-time roster data, use the [MLB API](https://statsapi.mlb.com/) or other official feeds.
- **Need historical season-level statistics?** This dataset is limited to current and recent roster information. For full stat histories, use sources like [FanGraphs](https://fangraphs.com/) or [Baseball-Reference](https://baseball-reference.com/).

## Scope

Currently **MLB only**. Registry provides four product datasets covering ~1,700+ players who appeared on a 40-man roster during the 2025 or 2026 seasons, with ongoing coverage as rosters change.

## Datasets

### player_ids
All known IDs plus basic names (last, first, middle). A thin wrapper around Crosswalk with authoritative name data.

### players_profile
All IDs plus full names and birth data. Cross-sport friendly.

### players_mlb_profile
Builds on `players_profile` with MLB-specific data: primary position, batting/throwing hand, and MLB debut date. Excludes team and roster status.

### players_mlb_roster
The richest dataset. Full profile plus current team and roster status. Also provides `by_team` and `by_team_status` groupings for team-centric lookups.

## File Formats

| Format | Extension | Notes |
|---|---|---|
| JSON (human-readable) | `.json` | Standard indented JSON |
| JSON (minified) | `.min.json` | Compressed for production use |
| CSV | `.csv` | Comma-delimited, header row |
| NDJSON | `.ndjson` | Newline-delimited JSON for streaming |
| by_id | `by_id/<pivot>.json` | Keyed by a specific ID for O(1) lookups |

All four formats are available for each product. `by_id` lookups are also available for each product. `players_mlb_roster` additionally provides `by_team` and `by_team_status` groupings.

## Repository Structure
- `/exports/` — generated dataset files, organized by product and format
- `/schema/` — schema definition driving all builds (`schema/leagues/mlb/players.yaml`)

## Attribution

PRISM Registry builds on data from:
- [PRISM Crosswalk](https://github.com/StatsVine/prism-crosswalk) (Open Data Commons Attribution License)
- MLB official data (publicly available via MLB.com and the MLB Stats API)
- [Chadwick Bureau / Register](https://github.com/chadwickbureau/register) (Open Data Commons Attribution License)
- [SmartFantasyBaseball's Player ID Map](https://www.smartfantasybaseball.com/tools/)

## License
- Data and schemas in this repo are licensed under the [Open Data Commons Attribution License (ODC-By 1.0)](https://opendatacommons.org/licenses/by/1-0/).
- Any code (build scripts, utilities) is licensed under MIT.

## Contributing

Pull requests are welcome. However, because this dataset is derived from Crosswalk and upstream sources, most improvements to player identity should be made in the Crosswalk repository.

### Contributions welcome:
- Validation improvements.
- Improvements to build process.
- Suggestions for new output formats.
- Schema additions.

### Pull requests likely to be rejected:
- **Adding new ID fields**: Player identity fields are sourced from Crosswalk. Add them there first.
- **Adding performance statistics**: This is metadata only; stats (batting, pitching, etc.) are out of scope.
- **Changing file format schemas**: Schema changes require cross-team discussion to avoid breaking downstream consumers. Propose via issue before coding.
- **Adding new datasets** without prior discussion. Open an issue to propose the scope and format first.

When in doubt, open an issue to discuss your proposed change before submitting a PR.
