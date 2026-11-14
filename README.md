# CDIO Study System

A research management web app for the dissertation *Institutionalization of the CDIO Framework in Philippine Engineering Education: A Comparative Multiple-Case Study*.

> **Preview build.** All figures shown are synthetic sample data, not study results. Data is not saved yet; a Supabase backend is planned.

## Features
- **Dashboard**: study phases, Institutional Maturity Index (IMI) by case, maturity radar
- **Cases**: maturity profiles, consensus scores with unverified-evidence flags, adoption timelines, barriers/enablers, document audit
- **Consensus scoring**: moderated session screen using the CDIO Standards v2.0 customized rubrics
- **Faculty survey (FCIS)**: dashboard plus a public survey form (`/s/demo`)
- **Cross-case synthesis**, **framework builder**, **e-Delphi validation**, **CDIO rubric reference**

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Tech
Next.js 15 (App Router, TypeScript), Tailwind CSS v4, Recharts, lucide-react.
