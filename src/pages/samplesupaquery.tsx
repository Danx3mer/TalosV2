import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase.ts'

export default function SampleSBQ() {
  const [instruments, setInstruments] = useState([])

  useEffect(() => {
    async function getInstruments() {
      const { data: instruments } = await supabase.from('instruments').select()

      if (instruments) {
        setInstruments(instruments)
      }
    }

    getInstruments()
  }, [])

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.id}>{instrument.name}</li>
      ))}
    </ul>
  )
}
