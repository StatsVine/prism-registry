# PRISM Registry

**PRISM (Player Record Identity Standard Mapping)** provides a registry of player identity mappings across major sports data providers. It aims to standardize the messy, inconsistent world of player identity across sports and data providers. By maintaining a clean core dataset and a richer registry dataset, we enable better interoperability for developers, researchers, and sports data enthusiasts. By using automation and strict validation, we can provide timely updates to player data.

prism-registry is an enriched roster dataset that provides stable identifiers and metadata aggregated from multiple data sources. It's intented as a primary data source for player metadata and identifiers.

Learn more about the full PRISM ecosystem (including the richer roster dataset and tooling for the data repos) at [prism-tools](https://github.com/statsvine/prism-tools).

## Overview
This repository builds on the core [prism-crosswalk](https://github.com/statsvine/prism-crosswalk) dataset, enriching the core dataset from external data sources, and remixes it into a variety of consumable data formats.

### Philosophy
- **Flexible** – Produces JSON, CSV, NDJSON, minified variants, and others for flexible consumption.
- **Stable schema**: The schema (including file and directory structure) should remain stable over time, with changes only made when absolutely necessary. This ensures consistent mappings and minimal disruption to downstream systems.
- **Downstream Friendly** – Designed for integration into tools, pipelines, and workflows that require stable player metadata.
- **Automated Builds** – Uses scripts and GitHub Actions to generate exports reliably and consistently.
- **Separation of Concerns** – Keeps raw data and build artifacts in distinct repos to simplify maintenance.

### Who this is for
If you already have detailed player metadata and are dealing with player identity mismatches across sources:

- **Data Engineers** needing consistent player IDs for their pipelines.
- **Sports Data Enthusiasts** cross-referencing player data.
- **API Builders** integrating player identity mappings into their APIs.
- **Researchers** analyzing player data across sources.
- **App Developers** building sports apps that require consistent player identifiers.

### Who this isn't for
- This registry is a somewhat opinionated dataset, with a curated set of metadata. While it's perfectly useable for merging purposes, if you just need identifier mapping with minimal metadata, [prism-crosswalk](https://github.com/statsvine/prism-crosswalk) might be a better fit.
- Historical data is limited: As of now, PRISM primarily focuses on active players and does not provide extensive historical player data.

## Repo Structure
This repository provides both comprehensive and minimal datasets to support a variety of downstream use cases.
### `exports/`
- Contains the various datasets.
### `schema/`
- Contains the schema files used to generate the export files.

## Datasets
### Shared
#### player_ids
- **Description**: Very minimal metadata, just prism-crosswalk with authoritative names from a primary datasource.
- **Use Case**: Just want identifiers with basic name metadata.

#### player_profile
- **Description**: Sightly richer metadata, but still fairly minimal. Suitable for cross-sport use.
- **Use Case**: Building a cross-sport player registry without additional sport-specific metadata.

### MLB
#### players_mlb_profile
- **Description**: Builds on player_profile, including MLB specific profile info.
- **Use Case**: Stable player data, including handedness and primary position. Excludes status and team info.

#### players_mlb_roster
- **Description**: Builds on mlb_profile, but includes status and team info.
- **Use Case**: Player metadata with team and status info.

### by_id JSON Files
For each dataset, we also provide **`by_id`** variants in JSON format:

- **Description**: Instead of a list of player objects, these files are JSON key-value maps where the key is an identifier from a specific source (e.g., MLBAM ID), and the value is the full player object.
- **Use Case**: Ideal for consumers needing to map a single identifier (like an MLB ID) to all available identifiers or metadata.

#### Example:
- `by_id/bbref_id.json`  
  - Keyed by **Baseball Reference ID** → maps to the player's metadata.

This structure enables simple and performant lookups from any known identifier namespace.

## File Formats
The `prism-registry` repository provides several output formats tailored for different use cases and consumers. All formats are automatically generated from the canonical `prism-crosswalk` dataset.

### `.csv`
- **Description**: Flat CSV file with one row per player and columns for each supported metadata field.
- **Use Case**: Ideal for Google Sheets/Excel users, manual inspection, and systems expecting tabular data.

### `.json`
- **Description**: Full JSON array containing one object per player.
- **Use Case**: Suitable for both human use and applications expecting structured, readable JSON with full context.

### `.min.json`
- **Description**: Minified version of `.json` with whitespace removed.
- **Use Case**: Optimized for bandwidth-sensitive environments, deployments, or client-side usage.

### `.ndjson`
- **Description**: Newline-delimited JSON, where each line is a standalone player record.
- **Use Case**: Useful for streaming pipelines, command-line tools (`jq`, etc.), and systems ingesting JSON line-by-line.

All formats are rebuilt automatically and are guaranteed to reflect the latest `main` branch of the source data repository.

## Attribution
The contents of this repository are built on top of the canonical dataset in [`prism-crosswalk`](https://github.com/StatsVine/prism-crosswalk). That repository serves as the source of truth for player ID mappings.

All identifier data originates from public or open-access sources and is compiled manually or through automation into a consistent cross-reference structure. We aim to attribute individual data sources where possible within the [`prism-crosswalk-data`](https://github.com/StatsVine/prism-crosswalk) README and accompanying documentation.

If you use this data, we encourage you to credit the original sources listed and cite [`prism-crosswalk`](https://github.com/StatsVine/prism-registry).

PRISM Registry stands on the shoulders of giants and builds on open community data projects, including:

- MLB: 
    - [Chadwick Bureau / Register](https://github.com/chadwickbureau/register) (Open Data Commons Attribution License)
    - [SmartFantasyBaseball's Player ID Map](https://www.smartfantasybaseball.com/tools/)

We thank these projects for providing foundational sports research resources.

## License
- Data and schemas in this repo are licensed under the [Open Data Commons Attribution License (ODC-By 1.0)](https://opendatacommons.org/licenses/by/1-0/).

## Contributing

Pull requests are welcome!

### We especially welcome:
- Validation improvements.
- Improvements to build process.
- Suggestions for new output formats.
- Schema additions.

### Pull Requests Likely to Be Rejected:
- **Schema changes**: Changing existing schemas, including file paths and names, is disruptive to downstream consumers and changes are very carefully considered for impact.
- **exports/ changes**: exports is dynamically built. Any changes should be made to the schema file or the primary data sources in prism-crosswalk-data.
- **Data changes**: This repo uses [prism-crosswalk](https://github.com/statsvine/prism-crosswalk) as a primary data source. Any errors, corrections, or data changes should be made in that repository.
- **Tooling changes**: This repo uses [prism-tools](https://github.com/statsvine/prism-tools) to generate output. Any issues, bugs or improvements to code should likely be made in that repository.

When in doubt, open an issue to discuss your proposed change before submitting a PR.