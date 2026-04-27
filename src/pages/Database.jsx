import { useState } from 'react'
import Layout from '../components/layout/Layout'
import Card from '../components/ui/Card'
import { DB_TABLES, TABLE_DESCRIPTIONS } from '../data/dbData'

const TABLE_NAMES = Object.keys(DB_TABLES)

const STATUS_COLORS = {
  upcoming:  'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
}

const CATEGORY_COLORS = {
  Programming:  'bg-purple-50 text-purple-700',
  Design:       'bg-pink-50 text-pink-700',
  Music:        'bg-yellow-50 text-yellow-700',
  Languages:    'bg-orange-50 text-orange-700',
  Photography:  'bg-cyan-50 text-cyan-700',
  Cooking:      'bg-lime-50 text-lime-700',
}

function CellValue({ col, value }) {
  if (value === null || value === undefined) {
    return <span className="text-[#aaa] italic text-xs">NULL</span>
  }

  if (col === 'status') {
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[value] ?? ''}`}>
        {value}
      </span>
    )
  }

  if (col === 'category') {
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[value] ?? 'bg-gray-100 text-gray-600'}`}>
        {value}
      </span>
    )
  }

  if (col === 'avatar_url') {
    return (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="text-[#0075de] text-xs underline truncate max-w-[120px] block"
      >
        {value.split('seed=')[1] ?? value}
      </a>
    )
  }

  if (col === 'rating') {
    return <span className="font-medium text-[#dd5b00]">{value}★</span>
  }

  return <span>{String(value)}</span>
}

function DbTable({ name }) {
  const { columns, rows } = DB_TABLES[name]
  const description = TABLE_DESCRIPTIONS[name]

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-[#615d59]">{description}</p>
        <p className="text-xs text-[#aaa] mt-1">
          {rows.length} row{rows.length !== 1 ? 's' : ''} · {columns.length} columns
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-black/10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#f6f5f4] border-b border-black/10">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2.5 text-left text-xs font-semibold text-[rgba(0,0,0,0.6)] tracking-wide uppercase whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-black/5 hover:bg-[#fafaf9] transition-colors"
              >
                {row.map((cell, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-4 py-2.5 text-[rgba(0,0,0,0.85)] whitespace-nowrap"
                  >
                    <CellValue col={columns[colIdx]} value={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Database() {
  const [activeTable, setActiveTable] = useState(TABLE_NAMES[0])

  return (
    <Layout>
      <section className="mb-8">
        <h1
          className="text-[2.5rem] font-bold text-[rgba(0,0,0,0.95)] leading-tight mb-1"
          style={{ letterSpacing: '-1.5px' }}
        >
          Database Tables
        </h1>
        <p className="text-[#615d59] text-lg">
          Live view of the SkillLink MySQL schema — 6 tables, all relationships visible.
        </p>
      </section>

      {/* Schema overview cards */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {TABLE_NAMES.map((name) => {
          const isActive = name === activeTable
          return (
            <button
              key={name}
              onClick={() => setActiveTable(name)}
              className={[
                'rounded-xl border px-3 py-3 text-left transition-all duration-150 focus:outline-none',
                isActive
                  ? 'border-[#0075de] bg-[#e8f3ff]'
                  : 'border-black/10 bg-white hover:border-[#0075de]/40',
              ].join(' ')}
            >
              <p className={`text-xs font-bold font-mono ${isActive ? 'text-[#0075de]' : 'text-[rgba(0,0,0,0.7)]'}`}>
                {name}
              </p>
              <p className="text-[11px] text-[#615d59] mt-0.5">
                {DB_TABLES[name].rows.length} rows
              </p>
            </button>
          )
        })}
      </section>

      {/* Table viewer */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-[rgba(0,0,0,0.95)] font-mono mb-4">
          {activeTable}
        </h2>
        <DbTable name={activeTable} />
      </Card>

      {/* ER diagram hint */}
      <section className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[rgba(0,0,0,0.95)] mb-3">Foreign Key Relationships</h3>
          <ul className="text-sm text-[#615d59] space-y-1.5">
            <li><span className="font-mono text-xs bg-[#f6f5f4] px-1.5 py-0.5 rounded">skill_offers.user_id</span> → users.user_id</li>
            <li><span className="font-mono text-xs bg-[#f6f5f4] px-1.5 py-0.5 rounded">skill_offers.skill_id</span> → skills.skill_id</li>
            <li><span className="font-mono text-xs bg-[#f6f5f4] px-1.5 py-0.5 rounded">skill_requests.user_id</span> → users.user_id</li>
            <li><span className="font-mono text-xs bg-[#f6f5f4] px-1.5 py-0.5 rounded">skill_requests.skill_id</span> → skills.skill_id</li>
            <li><span className="font-mono text-xs bg-[#f6f5f4] px-1.5 py-0.5 rounded">sessions.teacher_id</span> → users.user_id</li>
            <li><span className="font-mono text-xs bg-[#f6f5f4] px-1.5 py-0.5 rounded">sessions.learner_id</span> → users.user_id</li>
            <li><span className="font-mono text-xs bg-[#f6f5f4] px-1.5 py-0.5 rounded">matches.user1_id</span> → users.user_id</li>
            <li><span className="font-mono text-xs bg-[#f6f5f4] px-1.5 py-0.5 rounded">matches.user2_id</span> → users.user_id</li>
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-[rgba(0,0,0,0.95)] mb-3">Table Summary</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#615d59] font-semibold uppercase">
                <th className="text-left pb-2">Table</th>
                <th className="text-right pb-2">Rows</th>
                <th className="text-right pb-2">Cols</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_NAMES.map((name) => (
                <tr
                  key={name}
                  onClick={() => setActiveTable(name)}
                  className="border-t border-black/5 cursor-pointer hover:bg-[#fafaf9]"
                >
                  <td className="py-1.5 font-mono text-xs text-[rgba(0,0,0,0.85)]">{name}</td>
                  <td className="py-1.5 text-right text-[#615d59]">{DB_TABLES[name].rows.length}</td>
                  <td className="py-1.5 text-right text-[#615d59]">{DB_TABLES[name].columns.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </Layout>
  )
}
