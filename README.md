# prism-registry — pages branch

This is the `pages` branch of [prism-registry](https://github.com/StatsVine/prism-registry). It contains an Astro static site that serves the registry exports as a read-only JSON API at [registry.prism.statsvine.com](https://registry.prism.statsvine.com).

For dataset documentation, schemas, and build process, see the [main branch README](https://github.com/StatsVine/prism-registry/blob/main/README.md). For the broader PRISM ecosystem, see [prism.statsvine.com](https://prism.statsvine.com).

## Routes

```
/{sport}/{product}/{prism_id}
/{sport}/{product}/{prism_id}.json
/{sport}/{product}/by_id/{source}/{source_id}
/{sport}/{product}/by_id/{source}/{source_id}.json
/{sport}/{roster_product}/by_team/{pivot}/{team}
/{sport}/{roster_product}/by_team/{pivot}/{team}.json
/{sport}/{roster_product}/by_team_status/{pivot}/{team}
/{sport}/{roster_product}/by_team_status/{pivot}/{team}.json
```

All routes are pre-generated at build time. No runtime server.

`{sport}` is `mlb` or `nfl`. The `by_team` routes exist only for the roster
product of each sport — `players_mlb_roster` and `players_nfl_roster` — since
those are the only products carrying team and status. `{pivot}` is `abbrev` for
either sport, plus `mlb_id` for MLB.

## Data

Pages are generated from export files in `_data/exports/`, which mirrors the `exports/` directory from the main branch. In CI, the main branch triggers a rebuild of this branch after each export update.

## Development

```sh
npm install
npm run dev      # dev server at localhost:4321
npm run build    # build static site to ./dist/
npm run preview  # preview built site
```
